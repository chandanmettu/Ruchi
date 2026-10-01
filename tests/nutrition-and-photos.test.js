const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');

const root=path.resolve(__dirname,'..');
const table=require('../assets/data/nutrition-estimates.json');
const nutrition=require('../assets/js/nutrition-estimates.js');
nutrition.setTable(table);
global.window={RuchiNutrition:nutrition};
require('../assets/js/plate.js');
const photoContext={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/js/menu-photos.js'),'utf8'),photoContext);
const photos=photoContext.window.RuchiPhotos;

const menu=require('../assets/data/menu.json');
const extras=require('../assets/data/extras.json');
const items=new Map();
function collect(value){
  if(Array.isArray(value))return value.forEach(collect);
  if(value&&typeof value==='object'){
    if(value.id&&value.name&&value.category)items.set(value.id,value);
    Object.values(value).forEach(collect);
  }
}
collect(menu);collect(extras);

test('every selectable dish and alternative has a finite per-portion estimate',()=>{
  assert.equal(items.size,189);
  for(const item of items.values()){
    const choices=item.options?.length?item.options:[null];
    for(const option of choices){
      const value=nutrition.forDish(item,option);
      assert.ok(value,`${item.id} / ${option?.id||'plain'}`);
      assert.ok(value.serving);
      for(const field of ['kcal','protein','carbs','fat'])assert.ok(Number.isFinite(value[field])&&value[field]>=0,`${item.id}: ${field}`);
    }
  }
});

test('amounts scale with portions and user values override presets',()=>{
  const dosa=items.get('kal-dosa');
  const egg=items.get('extra-boiled-egg');
  const rows=[['dosa',{item:dosa,quantity:1.5,nutrition:null}],['egg',{item:egg,quantity:2,nutrition:null}]];
  const totals=window.RuchiPlate.totals(rows);
  assert.equal(totals[0].value,465);
  assert.equal(totals[1].value,19.5);
  assert.equal(totals[0].estimated,2);
  rows[0][1].nutrition={kcal:100,protein:4,carbs:18,fat:2,source:'user-entered'};
  assert.equal(window.RuchiPlate.totals(rows)[0].value,300);
});

test('photo matches exist and vague or misleading matches use icons',()=>{
  for(const item of items.values()){
    const src=photos.forDish(item);
    if(src)assert.ok(fs.existsSync(path.join(root,src)),`${item.id}: ${src}`);
  }
  assert.match(photos.forDish(items.get('peanut-chutney')),/peanut-chutney\.jpg$/);
  assert.match(photos.forDish(items.get('tomato-chutney')),/tomato-chutney\.jpg$/);
  assert.match(photos.forDish(items.get('dosakaya-chutney')),/dosakaya-chutney\.jpg$/);
  assert.equal(photos.forDish(items.get('vegetable-jaipuri')),null);
  assert.match(photos.forDish(items.get('semiya-payasam')),/payasam\.jpg$/);
  assert.match(photos.forDish(items.get('boondi-raita')),/raita\.jpg$/);
  assert.equal(photos.forDish(items.get('onion-raita')),null);
  assert.equal(photos.forDish(items.get('fruit-custard')),null);
  assert.equal(photos.forDish(items.get('egg-or-banana')),null);
});
