import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';

import { ConfiguracionService } from 'src/app/core/services/configuracion.service';
import { Response } from 'src/app/core/models/response.model';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import * as PARAMETROS from '../../../core/properties/parametros.parameter';
import * as MENSAJES from 'src/app/core/properties/messages.parameters';
import { JEIS_RESPONSE } from 'src/app/core/models/framework.model';
import { AlarmaSGA, Configuracion } from 'src/app/core/models/configuracion.model';

@Component({
  selector: 'app-nueva-alarma',
  templateUrl: './nueva-alarma.component.html',
  styleUrls: ['./nueva-alarma.component.scss']
})
export class NuevaAlarmaComponent implements OnInit {

	nombreSolicitante: string;
  activaAsesor: boolean = false;
  activaVoceo: boolean = false;
  estadoPorDefecto: string = "Alarmado";
  alarmadoPor = [];
  confirmacion = [];
  estados = [];
  severidad = [];
  tiposEventos: Configuracion[] = [];
  atribuibles: Configuracion[] = [];
  tiposProblemas: Configuracion[] = [];
  detalles: Configuracion[] = [];

  // datos tecnicos
  ciudades = [];
  codigoCiudad;
  tecnologias = [];
  codigoTecnologia;
  niveles1 = [];
  codigoNivel1;
  niveles2 = [];
  codigoNivel2;
  niveles3 = [];
  codigoNivel3;
  niveles4 = [];
  codigoNivel4;

	modo: "Nuevo" | "Editar";

	formulario: FormGroup;

	constructor(private configuracionService: ConfiguracionService,
		private authService: AuthService,
		private formBuilder: FormBuilder,
		private alertMessageService: AlertMessagesService,
    ) { }

	ngOnInit() {
    this.modo = "Nuevo";
		this.nombreSolicitante = this.authService.getNombreUsuario();
    this.consultarInfo(PARAMETROS.ID_CATALOGO_ALARMADO_POR);
    this.consultarInfo(PARAMETROS.ID_CATALOGO_CONFIRMACION);
    this.consultarInfo(PARAMETROS.ID_CATALOGO_ESTADOS);
    this.consultarInfo(PARAMETROS.ID_CATALOGO_SEVERIDAD);
    this.consultarInfoConfiguracion(PARAMETROS.ID_CATALOGO_ATRIBUIBLE);
    this.consultarInfoConfiguracion(PARAMETROS.ID_CATALOGO_TIPO_EVENTO);
    this.consultarInfoConfiguracion(PARAMETROS.ID_CATALOGO_TIPO_PROBLEMA);
    this.consultarInfoConfiguracion(PARAMETROS.ID_CATALOGO_DETALLE);
    this.consultarCiudades();
    this.consultarTecnologias();
    this.consultarNiveles1();
    this.consultarNiveles2();
    this.consultarNiveles3Y4();

		this.initForm();
	}

	initForm() {
		this.formulario = this.formBuilder.group({
      nTicket: ['', Validators.required],
      alarmadoPor: ['', Validators.required],
      confirmacionPorNOC: ['', Validators.required],
      tipoEvento: ['', Validators.required],
      nTicketNOC: [''],
      fechaInicio: ['', Validators.required],
      horaInicio: ['', Validators.required],
      fechaPosSol: [''],
      estado: [this.estadoPorDefecto],
      fechaFin: [''],
      horaFin: [''],
      horaPosSol: ['00'],
      minutoPosSol: ['00'],
      activaVoceo: [''],
      atencionAsesor: [''],
      usuario: [this.nombreSolicitante, Validators.required],
      fechaIngreso: ['', Validators.required],
      severidad: ['', Validators.required],
      ciudadElegida: ['', Validators.required],
      ciudad: ['', Validators.required],
      tecnologiaElegida: ['', Validators.required],
      tecnologia: ['', Validators.required],
      nivel1Elegido: ['', Validators.required],
      nivel1: ['', Validators.required],
      nivel2Elegido: ['', Validators.required],
      nivel2: ['', Validators.required],
      nivel3Elegido: ['', Validators.required],
      nivel3: ['', Validators.required],
      nivel4Elegido: ['', Validators.required],
      nivel4: ['', Validators.required],
      atribuible: ['', Validators.required],
      tipoProblema: ['', Validators.required],
      detalle: ['', Validators.required]
		});

    this.formulario.get('tecnologia').disable();
    this.formulario.get('tecnologiaElegida').disable();
    this.formulario.get('nivel1Elegido').disable();
    this.formulario.get('nivel1').disable();
    this.formulario.get('nivel2Elegido').disable();
    this.formulario.get('nivel2').disable();
    this.formulario.get('nivel3Elegido').disable();
    this.formulario.get('nivel3').disable();
    this.formulario.get('nivel4Elegido').disable();
    this.formulario.get('nivel4').disable();

    this.formulario.get('ciudad').valueChanges.subscribe(check => {
			if (check) {
				this.formulario.get('ciudadElegida').setValue(this.formulario.get('ciudad').value);
        this.formulario.get('tecnologiaElegida').enable();
        this.formulario.get('tecnologia').enable();
			}
		});
    this.formulario.get('tecnologia').valueChanges.subscribe(check => {
			if (check) {
				this.formulario.get('tecnologiaElegida').setValue(this.formulario.get('tecnologia').value);
        this.formulario.get('nivel1Elegido').enable();
        this.formulario.get('nivel1').enable();
			}
		});
    this.formulario.get('nivel1').valueChanges.subscribe(check => {
			if (check) {
				this.formulario.get('nivel1Elegido').setValue(this.formulario.get('nivel1').value);
        this.formulario.get('nivel2Elegido').enable();
        this.formulario.get('nivel2').enable();
			}
		});
    this.formulario.get('nivel2').valueChanges.subscribe(check => {
			if (check) {
				this.formulario.get('nivel2Elegido').setValue(this.formulario.get('nivel2').value);
        this.formulario.get('nivel3Elegido').enable();
        this.formulario.get('nivel3').enable();
			}
		});
    this.formulario.get('nivel3').valueChanges.subscribe(check => {
			if (check) {
				this.formulario.get('nivel3Elegido').setValue(this.formulario.get('nivel3').value);
        this.formulario.get('nivel4Elegido').enable();
        this.formulario.get('nivel4').enable();
			}
		});
    this.formulario.get('nivel4').valueChanges.subscribe(check => {
			if (check) {
				this.formulario.get('nivel4Elegido').setValue(this.formulario.get('nivel4').value);
			}
		});
	}

  consultarInfo(parametro : string) {
    this.configuracionService.consultaInfo(parametro).subscribe(
      (response: JEIS_RESPONSE) => {
				if (response.pnerrorOut == 0 && response.pvresultadoOut != '') {
          var registro = response.pvresultadoOut.datos.registro;
          if (parametro == PARAMETROS.ID_CATALOGO_ALARMADO_POR) {
					  this.alarmadoPor = registro;
          } else if (parametro == PARAMETROS.ID_CATALOGO_CONFIRMACION) {
            this.confirmacion = registro;
          } else if (parametro == PARAMETROS.ID_CATALOGO_ESTADOS) {
            this.estados = registro;
          } else if (parametro == PARAMETROS.ID_CATALOGO_SEVERIDAD) {
            this.severidad = registro;
          }
				}
			},
      (error: HttpErrorResponse) => {
        this.alertMessageService.showMessage.next({
          mensaje: MENSAJES.UNKNOWN_ERROR,
          tipo: "error"
        });
      }
    );
  }

  consultarInfoConfiguracion(parametro : string) {
    this.configuracionService.consultaInfo(parametro).subscribe(
      (response: JEIS_RESPONSE) => {
				if (response.pnerrorOut == 0 && response.pvresultadoOut != '') {
          var registro = response.pvresultadoOut.datos.registro;
          if (parametro == PARAMETROS.ID_CATALOGO_ATRIBUIBLE) {
					  this.atribuibles = <Configuracion[]> registro;
          } else if (parametro == PARAMETROS.ID_CATALOGO_TIPO_EVENTO) {
            this.tiposEventos = <Configuracion[]> registro;
          } else if (parametro == PARAMETROS.ID_CATALOGO_TIPO_PROBLEMA) {
            this.tiposProblemas = <Configuracion[]> registro;
          } else if (parametro == PARAMETROS.ID_CATALOGO_DETALLE) {
            this.detalles = <Configuracion[]> registro;
          }
				}
			},
      (error: HttpErrorResponse) => {
        this.alertMessageService.showMessage.next({
          mensaje: MENSAJES.UNKNOWN_ERROR,
          tipo: "error"
        });
      }
    );
  }

  consultarCiudades() {
    this.ciudades =  [
      {
          "ciudad": "150000001",
          "nombre": "GUAYAQUIL"
      },
      {
          "ciudad": "150018006",
          "nombre": "QUITO"
      }
    ];
    /*
    this.configuracionService.consultaCiudades().subscribe(
      (response: JEIS_RESPONSE) => {
				if (response.pnerrorOut == 0 && response.pvresultadoOut != '') {
          this.ciudades = response.pvresultadoOut.datos.registro;
				}
			},
      (error: HttpErrorResponse) => {
        this.alertMessageService.showMessage.next({
          mensaje: MENSAJES.UNKNOWN_ERROR,
          tipo: "error"
        });
      }
    ); */
  }

  guardarCodigoCiudad(ciudad){
    this.ciudades.map((e,i) => {
      if (e.nombre == ciudad.target.value){
        this.codigoCiudad = e.ciudad;
      }
      console.log(this.codigoCiudad)
    });
  }

  consultarTecnologias() {
    this.tecnologias =  [
      {
          "IDCOBERTURA": "3",
          "DESCRIPCION": "HFC"
      },
      {
          "IDCOBERTURA": "24",
          "DESCRIPCION": "GPON"
      }
    ];
    /*
    this.configuracionService.consultaTecnologias(this.codigoCiudad).subscribe(
      (response: JEIS_RESPONSE) => {
				if (response.pnerrorOut == 0 && response.pvresultadoOut != '') {
          this.tecnologias = response.pvresultadoOut.datos.registro;
				}
			},
      (error: HttpErrorResponse) => {
        this.alertMessageService.showMessage.next({
          mensaje: MENSAJES.UNKNOWN_ERROR,
          tipo: "error"
        });
      }
    ); */
  }

  guardarCodigoTecnologia(tecnologia){
    this.tecnologias.map((e,i) => {
      if (e.DESCRIPCION == tecnologia.target.value){
        this.codigoTecnologia = e.IDCOBERTURA;
      }
      console.log(this.codigoTecnologia)
    });
  }

  consultarNiveles1() {
    this.niveles1 =  [
      {
          "ID_EQUIPO_NIVEL1": "1053",
          "DESCRIPCION": "NDSAMANES"
      },
      {
          "ID_EQUIPO_NIVEL1": "1047",
          "DESCRIPCION": "NDMIRAFLOR"
      }
    ];
    /*
    this.configuracionService.consultaNiveles1(this.codigoCiudad,this.codigoNivel1).subscribe(
      (response: JEIS_RESPONSE) => {
				if (response.pnerrorOut == 0 && response.pvresultadoOut != '') {
          this.niveles1 = response.pvresultadoOut.datos.registro;
				}
			},
      (error: HttpErrorResponse) => {
        this.alertMessageService.showMessage.next({
          mensaje: MENSAJES.UNKNOWN_ERROR,
          tipo: "error"
        });
      }
    ); */
  }

  guardarCodigoNivel1(nivel1){
    this.niveles1.map((e,i) => {
      if (e.DESCRIPCION == nivel1.target.value){
        this.codigoNivel1 = e.ID_EQUIPO_NIVEL1;
      }
      console.log(this.codigoNivel1)
    });
  }

  consultarNiveles2() {
    this.niveles2 =  [
      {
          "ID_DET_PLA_EXT": "377",
          "DATO_EQUIPO": "001"
      },
      {
          "ID_DET_PLA_EXT": "386",
          "DATO_EQUIPO": "002"
      }
      ,
      {
          "ID_DET_PLA_EXT": "364",
          "DATO_EQUIPO": "003"
      },
      {
          "ID_DET_PLA_EXT": "398",
          "DATO_EQUIPO": "004"
      },
      {
          "ID_DET_PLA_EXT": "375",
          "DATO_EQUIPO": "005"
      }
    ];
    /*
    this.configuracionService.consultaNiveles2(this.codigoNivel1,this.codigoTecnologia).subscribe(
      (response: JEIS_RESPONSE) => {
				if (response.pnerrorOut == 0 && response.pvresultadoOut != '') {
          this.niveles2 = response.pvresultadoOut.datos.registro;
				}
			},
      (error: HttpErrorResponse) => {
        this.alertMessageService.showMessage.next({
          mensaje: MENSAJES.UNKNOWN_ERROR,
          tipo: "error"
        });
      }
    ); */
  }

  guardarCodigoNivel2(nivel2){
    this.niveles2.map((e,i) => {
      if (e.DATO_EQUIPO == nivel2.target.value){
        this.codigoNivel2 = e.ID_DET_PLA_EXT;
      }
      console.log(this.codigoNivel2)
    });
  }

  consultarNiveles3Y4() {
    this.niveles3 =  [
      {
          "ID_DET_PLA_EXT": "5519",
          "DATO_EQUIPO": "01"
      },
      {
          "ID_DET_PLA_EXT": "5518",
          "DATO_EQUIPO": "02"
      }
      ,
      {
          "ID_DET_PLA_EXT": "5524",
          "DATO_EQUIPO": "03"
      },
      {
          "ID_DET_PLA_EXT": "5521",
          "DATO_EQUIPO": "04"
      },
      {
          "ID_DET_PLA_EXT": "5516",
          "DATO_EQUIPO": "05"
      }
    ];
    this.niveles4 =  [
      {
          "ID_DET_PLA_EXT": "19628",
          "DATO_EQUIPO": "0"
      },
      {
          "ID_DET_PLA_EXT": "19626",
          "DATO_EQUIPO": "01"
      }
      ,
      {
          "ID_DET_PLA_EXT": "19629",
          "DATO_EQUIPO": "02"
      },
      {
          "ID_DET_PLA_EXT": "19627",
          "DATO_EQUIPO": "03"
      }
    ]; /*
    this.configuracionService.consultaNiveles3o4(this.codigoNivel2,this.codigoTecnologia,"3").subscribe(
      (response: JEIS_RESPONSE) => {
        if (response.pnerrorOut == 0 && response.pvresultadoOut != '') {
          this.niveles3 = response.pvresultadoOut.datos.registro;
        }
      },
      (error: HttpErrorResponse) => {
        this.alertMessageService.showMessage.next({
          mensaje: MENSAJES.UNKNOWN_ERROR,
          tipo: "error"
        });
      }
    );
    this.configuracionService.consultaNiveles3o4(this.codigoNivel2,this.codigoTecnologia,"4").subscribe(
      (response: JEIS_RESPONSE) => {
        if (response.pnerrorOut == 0 && response.pvresultadoOut != '') {
          this.niveles4 = response.pvresultadoOut.datos.registro;
        }
      },
      (error: HttpErrorResponse) => {
        this.alertMessageService.showMessage.next({
          mensaje: MENSAJES.UNKNOWN_ERROR,
          tipo: "error"
        });
      }
    );
    */
  }

  guardarCodigoNivel3o4(n,nivel){
    if ( nivel == "3" ) {
      this.niveles3.map((e,i) => {
        if (e.DATO_EQUIPO == n.target.value){
          this.codigoNivel3 = e.ID_DET_PLA_EXT;
        }
        console.log(this.codigoNivel3)
      });
    } else if ( nivel == "4" ) {
      this.niveles4.map((e,i) => {
        if (e.DATO_EQUIPO == n.target.value){
          this.codigoNivel4 = e.ID_DET_PLA_EXT;
        }
        console.log(this.codigoNivel4)
      });
    }
  }

	onReiniciarFormulario() {
		this.formulario.reset();
		this.initForm();
	}

  activarAsesor(){
    this.activaAsesor = !this.activaAsesor;
    console.log(this.activaVoceo);
    console.log(this.activaAsesor)
  }

  activarVoceo(){
    this.activaVoceo = !this.activaVoceo;
    console.log(this.activaVoceo);
    console.log(this.activaAsesor)
  }

  submit(e){
    let atencionAsesor = 0,activaVoceo = 1;

    if ( this.activaAsesor ) {
      atencionAsesor = 1;
      activaVoceo = 1;
    }
    if ( !this.activaVoceo ) {
      atencionAsesor = 0;
      activaVoceo = 0
    }

    const alarma: AlarmaSGA = {
      id_ticket: this.formulario.value.nTicket,
      estado: this.formulario.value.estado, //debería ser opcional en la base
      fecha_inicio: this.formulario.value.fechaInicio,
      hora_inicio: this.formulario.value.horaInicio,
      fecha_fin: this.formulario.value.fechaFin, //op
      hora_fin: this.formulario.value.horaFin,  //op
      severidad: this.formulario.value.severidad,
      fecha_pos_sol: this.formulario.value.fechaPosSol, //debería ser opcional en la base?
      tiempo_pos_sol: this.formulario.value.horaPosSol + ':' + this.formulario.value.minutoPosSol, //debería ser opcional en la base?
      atencion_asesor: atencionAsesor,//op
      alarmado_por: this.formulario.value.alarmadoPor,
      tipo_evento: this.formulario.value.tipoEvento,
      id_ticket_NOC: this.formulario.value.nTicketNOC,//op
      atribuible: this.formulario.value.atribuible,
      detalle: this.formulario.value.detalle,
      tipo_prob: this.formulario.value.tipoProblema,
      confirmacion_NOC: this.formulario.value.confirmacionPorNOC,
      activa_voceo: activaVoceo,  //op
      usuario_ingreso: this.formulario.value.usuario,
      fecha_ingreso: this.formulario.value.fechaIngreso,
      id_ciudad: this.codigoCiudad,
      id_tecnologia: this.codigoTecnologia,
      nivel1: this.formulario.value.nivel1Elegido,
      id_nivel1: this.codigoNivel1,
      nivel2: this.formulario.value.nivel2Elegido,
      id_nivel2: this.codigoNivel2,
      nivel3: this.formulario.value.nivel3Elegido,
      id_nivel3: this.codigoNivel3,
      nivel4: this.formulario.value.nivel4Elegido,
      id_nivel4: this.codigoNivel4,
      //usuario_modif: this.formulario.value.estado, //op
      //fecha_modif: this.formulario.value.estado    //op
		};

    this.configuracionService.crearAlarma(alarma,this.modo).subscribe(
      (response: Response) => {
        if(response.error == null){
          this.alertMessageService.showMessage.next(
            {
              mensaje: 'Alarma registrado correctamente',
              tipo: 'success'
            }
          );
          this.configuracionService.nuevaConfiguracion.next();
        }
        else if(response.error == 'ERROR'){
          this.alertMessageService.showMessage.next({
            mensaje: response.objeto,
            tipo: "error"
          })
        }
      }
    )
  }

}
