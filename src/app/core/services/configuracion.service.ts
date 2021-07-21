import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AlarmaSGA } from '../models/configuracion.model';

import * as WS from '../properties/url-web-services.parameter';

@Injectable()
export class ConfiguracionService {
	public mensajeError: Subject<string> = new Subject<string>();
	public nuevaConfiguracion: Subject<any> = new Subject();

	constructor(private http: HttpClient) { }

  public consultaInfo(idCatalogo:string) {
    return this.http.post(WS.URL_JEIS_REST, {
      dsId: environment.JEIS_AXISD_JDBC,
      pnIdServicioInformacion: environment.JEIS_CONSULTA_INFO,
      sentencias_binds: [
        {
          parametros: [
            {
              parameterValue: idCatalogo
            }
          ]
        }
      ]
    })
  }

  public consultaCiudades() {
    return this.http.post(WS.URL_JEIS_REST, {
      dsId: environment.JEIS_CLAROVIDEO03_JDBC,
      pnIdServicioInformacion: environment.JEIS_CONSULTA_CIUDAD,
      sentencias_binds: [
        {}
      ]
    })
  }

  public consultaTecnologias(ciudad: string) {
    return this.http.post(WS.URL_JEIS_REST, {
      dsId: environment.JEIS_CLAROVIDEO03_JDBC,
      pnIdServicioInformacion: environment.JEIS_CONSULTA_TECNOLOGIA,
      sentencias_binds: [
        {
          parametros: [
            {
              parameterValue: ciudad
            }
          ]
        }
      ]
    })
  }

  public consultaNiveles1(ciudad: string, tecnologia: string) {
    return this.http.post(WS.URL_JEIS_REST, {
      dsId: environment.JEIS_CLAROVIDEO03_JDBC,
      pnIdServicioInformacion: environment.JEIS_CONSULTA_NIVEL1,
      sentencias_binds: [
        {
          parametros: [
            {
              parameterValue: ciudad,tecnologia
            }
          ]
        }
      ]
    })
  }

  public consultaNiveles2(tecnologia: string, nivel1: string) {
    return this.http.post(WS.URL_JEIS_REST, {
      dsId: environment.JEIS_CLAROVIDEO03_JDBC,
      pnIdServicioInformacion: environment.JEIS_CONSULTA_NIVEL2,
      sentencias_binds: [
        {
          parametros: [
            {
              parameterValue: nivel1,tecnologia
            }
          ]
        }
      ]
    })
  }

  public consultaNiveles3o4(nivel2: string, tecnologia: string, nivelNecesitado: string) {
    return this.http.post(WS.URL_JEIS_REST, {
      dsId: environment.JEIS_CLAROVIDEO03_JDBC,
      pnIdServicioInformacion: environment.JEIS_CONSULTA_NIVEL3o4,
      sentencias_binds: [
        {
          parametros: [
            {
              parameterValue: nivel2,tecnologia,nivelNecesitado
            }
          ]
        }
      ]
    })
  }

	public buscarConfiguracion(nombre: string,id_grupo: string) {
		return this.http.post(WS.OBTENER_CONFIGURACION, {
      nombre,
      id_grupo
    });
	}

	public crearConfiguracion(nombre: string, idGrupo: string, usuarioRegistro: string) {
		return this.http.post(WS.CREAR_CONFIGURACION, {
			nombre,
			idGrupo,
      usuarioRegistro
		})
	}

	public cambiarEstado(idCatalogo: number){
		return this.http.put(WS.MODIFICAR_ESTADO_CONFIGURACION, {
			idCatalogo
		})
	}

	public modificarNombre(idCatalogo:number, nombre: string, usuarioModificacion: string){
		return this.http.put(WS.MODIFICAR_NOMBRE_CONFIGURACION, {
			idCatalogo,
			nombre,
      usuarioModificacion
		});
	}

  public crearAlarma(alarma:AlarmaSGA, modo:string) {
    if (modo == "Nuevo") {
			return this.http.post(WS.CREAR_ALARMA, alarma);
		}
		else {
			//return this.http.post(WS.ACTUALIZAR_TIPO_ALARMA, tipoAlarma);
		}
	}
}
