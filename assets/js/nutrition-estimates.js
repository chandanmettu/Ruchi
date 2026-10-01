/* Approximate cooked-serving presets; the mess has not supplied nutrient data. */
(function(root) {
  'use strict';
  let table=null;
  function setTable(value) {
    if(!value||!value.profiles||!value.items)throw new Error('Nutrition table unavailable');
    table=value;
  }
  function forDish(item,option) {
    if(!table||!item)return null;
    // A choice must be selected before an estimate can be attached to a log.
    if(item.options?.length&&!option)return null;
    const id=option?.id||item.id;
    const profile=table.profiles[table.items[id]];
    return profile?{...profile,source:'estimated'}:null;
  }
  function forLog(row) {
    return row.nutrition||forDish(row.item,row.option);
  }
  const api={setTable,forDish,forLog};
  if(typeof module==='object'&&module.exports)module.exports=api;
  else root.RuchiNutrition=api;
})(typeof window==='undefined'?globalThis:window);
