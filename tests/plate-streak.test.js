const test=require('node:test');
const assert=require('node:assert/strict');

global.window={};
require('../assets/js/plate.js');
const {loggingStreak}=window.RuchiPlate;

function storage(entries){
  const values=new Map(Object.entries(entries));
  return {length:values.size,key:i=>Array.from(values.keys())[i],getItem:key=>values.get(key)??null};
}
const prefix='ruchi.menu-intake.v2.';
const plate=JSON.stringify({dosa:{item:{id:'dosa'},quantity:1}});

test('food log streak spans month boundaries and counts today',()=>{
  const saved=storage({[prefix+'2026-09-30']:plate,[prefix+'2026-10-01']:plate,[prefix+'2026-10-02']:plate});
  assert.equal(loggingStreak(saved,prefix,'2026-10-02'),3);
});

test('yesterday stays active until today is logged, but a missed day breaks the streak',()=>{
  const saved=storage({[prefix+'2026-09-29']:plate,[prefix+'2026-09-30']:plate,[prefix+'2026-10-01']:plate});
  assert.equal(loggingStreak(saved,prefix,'2026-10-02'),3);
  assert.equal(loggingStreak(saved,prefix,'2026-10-03'),0);
});

test('empty or invalid entries do not claim a logged day',()=>{
  const saved=storage({[prefix+'2026-10-02']:'{}',[prefix+'2026-10-01']:plate,[prefix+'2026-09-30']:JSON.stringify({bad:{item:{id:'dosa'},quantity:0}})});
  assert.equal(loggingStreak(saved,prefix,'2026-10-02'),1);
});
