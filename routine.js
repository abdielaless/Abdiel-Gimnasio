const EXERCISES = {
 military: ['Press militar sentado','Mancuernas · con respaldo',3,6,12,150,['shoulders']],
 lateral: ['Elevaciones laterales','Polea',3,10,20,120,['shoulders'],false,true],
 incline: ['Press inclinado','Máquina',3,6,12,150,['chest']],
 pec: ['Peck deck','Máquina',3,10,15,120,['chest']],
 katana: ['Extensión katana','Polea · unilateral',3,8,15,105,['triceps'],true],
 pushdown: ['Extensión de tríceps hacia abajo','Polea · unilateral',3,8,15,105,['triceps'],true,true],
 curl: ['Curl inclinado','Mancuernas',3,8,12,120,['biceps']],
 pulldown: ['Jalón al pecho','Polea',3,6,12,150,['back']],
 trow: ['Remo en T','Con apoyo para el pecho',3,6,12,150,['back']],
 row: ['Remo en polea baja','Codos cerca del cuerpo',3,8,12,150,['back']],
 rear: ['Pájaros en peck deck inverso','Deltoides posterior',3,10,20,120,['rear'],false,true],
 hammer: ['Curl martillo','Mancuernas',3,8,15,120,['biceps'],false,true],
 press: ['Prensa','Máquina',3,8,12,150,['quads','glutes']],
 legcurl: ['Curl femoral sentado','Máquina',3,8,15,120,['hamstrings']],
 extension: ['Extensión de cuádriceps','Máquina',2,10,15,120,['quads']],
 calf: ['Gemelos','Máquina o prensa',3,10,20,120,['calves']],
 hip: ['Hip thrust','Máquina',3,8,12,150,['glutes']],
 abduct: ['Abducción de cadera','Máquina',2,12,20,105,['abductors']],
 legraise: ['Elevación de piernas en colchoneta','Pauta de fisioterapia',4,12,12,120,['core'],false,false,true],
 crunch: ['Flexión de tronco en colchoneta','Pauta de fisioterapia',4,12,12,120,['core'],false,false,true],
 hanging: ['Elevación de piernas suspendido','Pauta de fisioterapia',3,12,12,120,['core'],false,false,true],
 shrug: ['Encogimientos con mancuernas','Fisioterapia · descanso por confirmar («V»)',4,12,12,null,['traps'],false,false,true],
 oblique: ['Oblicuos en colchoneta','Fisioterapia · variante y lateralidad según tu pauta',4,12,12,120,['core'],false,false,true]
};
const DAYS = [
 {name:'Lunes',type:'Push',focus:'Hombros, pecho y tríceps',items:['military','lateral','incline','pec','katana','pushdown','legraise','crunch']},
 {name:'Martes',type:'Pull',focus:'Espalda, bíceps y deltoides posterior',items:['curl','pulldown','trow','row','rear','hammer']},
 {name:'Miércoles',type:'Legs',focus:'Cuádriceps, femorales y gemelos',items:['press','legcurl','extension','calf',['crunch',3],'hanging']},
 {name:'Jueves',type:'Upper',focus:'Torso completo · prioridad hombros y brazos',items:['lateral',['curl',2],['katana',2],['incline',2],['pulldown',2],['trow',2,8,12],['pec',2],['hammer',2],['pushdown',2],['rear',2]]},
 {name:'Viernes',type:'Lower',focus:'Glúteos, piernas y pauta de fisioterapia',items:['hip','legcurl','press','abduct','calf','shrug','oblique']}
];
const MUSCLES={shoulders:'Hombros',chest:'Pecho',triceps:'Tríceps',biceps:'Bíceps',back:'Espalda',rear:'Deltoides posterior',quads:'Cuádriceps',glutes:'Glúteos',hamstrings:'Femorales',calves:'Gemelos',abductors:'Abductores',core:'Core',traps:'Trapecios'};
function plan(day,phase){return DAYS[day].items.map(item=>{let [id,sets,min,max]=Array.isArray(item)?item:[item];let [name,detail,n,lo,hi,rest,muscles,unilateral=false,failure=false,therapy=false]=EXERCISES[id];return {id,name,detail,sets:phase==='intro'&&!therapy?2:sets??n,min:min??lo,max:max??hi,rest,muscles,unilateral,failure,therapy};});}
function rowKeys(e){return Array.from({length:e.sets},(_,i)=>e.unilateral?[`${i}-I`,`${i}-D`]:[`${i}`]).flat();}
function exerciseStatus(e,records){let n=rowKeys(e).filter(k=>records?.[e.id]?.[k]?.done).length;return n===rowKeys(e).length?'done':n?'partial':'pending';}
