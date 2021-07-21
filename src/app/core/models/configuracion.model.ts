export interface Configuracion {
	id_catalogo:number,
	descripcion:string,
	id_estado:string,
	usuario_creacion:string,
	fecha_creacion:string,
	usuario_modificiacion:string,
	fecha_modificacion:string,
  position?: number
}

export interface AlarmaSGA {
	id_ticket:number,
	estado?:string, //debería ser opcional en la base?
	fecha_inicio:string,
	hora_inicio:string,
	fecha_fin?:string,
	hora_fin?:string,
	severidad:string,
  fecha_pos_sol?: string, //debería ser opcional en la base?
  tiempo_pos_sol?: string, //debería ser opcional en la base?
  atencion_asesor?: number,
  alarmado_por: string, //opcional en base, no debería ser obligatorio?
  tipo_evento: string,//opcional en base, no debería ser obligatorio?
  id_ticket_NOC?: number,
  atribuible: string, //opcional en base, no debería ser obligatorio?
  detalle: string,    //opcional en base, no debería ser obligatorio?
  tipo_prob: string,  //opcional en base, no debería ser obligatorio?
  confirmacion_NOC: string, //opcional en base, no debería ser obligatorio?
  activa_voceo?: number,
  usuario_ingreso: string,
  fecha_ingreso: string,

  // datos tecnicos
  id_ciudad: number,
  id_tecnologia: number,
  nivel1: string,
  id_nivel1: number,
  nivel2: string,
  id_nivel2: number,
  nivel3: string,
  id_nivel3: number,
  nivel4: string,
  id_nivel4: number,

  usuario_modif?: string,
  fecha_modif?: string,
  position?: number
}
