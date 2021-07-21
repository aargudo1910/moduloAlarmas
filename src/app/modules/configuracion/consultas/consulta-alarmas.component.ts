import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Response } from 'src/app/core/models/response.model';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as MENSAJES from '../../../core/properties/messages.parameters';
import * as PARAMETROS from '../../../core/properties/parametros.parameter';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmPopupComponent } from 'src/app/shared/components/confirm-popup/confirm-popup.component';
import { AlarmaSGA } from 'src/app/core/models/configuracion.model';
import { JEIS_RESPONSE } from 'src/app/core/models/framework.model';
import { NuevaAlarmaComponent } from '../configuracion-alarmas/nueva-alarma.component';

@Component({
  selector: 'app-consulta-alarmas',
  templateUrl: './consulta-alarmas.component.html',
  styleUrls: ['./consulta-alarmas.component.scss']
})
export class ConsultaAlarmasComponent implements OnInit {

  alarmas: AlarmaSGA[];

  public dataSource = new MatTableDataSource<AlarmaSGA>();
  public displayedColumns = ['position','idTicket','ticketNOC','estado','severidad','nivel1','cantidadIncidentes','fechaUltInc','tecnologia','servicioAfect','tipoEvento','idEvento','ciudad','fechaInicio','fechaPosSol','fechaIngreso','usuarioIngreso','usuarioModificacion','fechaModificacion'];
  selection = new SelectionModel<AlarmaSGA>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  configuracionService: any;

  constructor(private usuarioService: AuthService,
    private alertMessageService: AlertMessagesService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getAlarmas();

    /*this.usuarioService.nuevoUsuario.subscribe(
      () => {
        this.getUsuariosPermitidos();
      }
    )*/
  }

  getAlarmas(){
    this.alarmas = <AlarmaSGA[]> [
      {
          "id_ticket": 150000001,
          "estado": "GUAYAQUIL",
          "fecha_inicio": "150000001",
          "hora_inicio": "GUAYAQUIL",
          "severidad": "150000001",
          "fecha_pos_sol": "GUAYAQUIL",
          "alarmado_por": "150000001",
          "tipo_evento": "GUAYAQUIL",
          "atribuible": "150000001",
          "detalle": "GUAYAQUIL",
          "tipo_prob": "150000001",
          "confirmacion_NOC": "GUAYAQUIL",
          "usuario_ingreso": "150000001",
          "fecha_ingreso": "GUAYAQUIL",
          "id_ciudad": 150000001,
          "id_tecnologia": 150000001,
          "nivel1": "150000001",
          "id_nivel1": 150000001,
          "nivel2": "150000001",
          "id_nivel2": 150000001,
          "nivel3": "150000001",
          "id_nivel3": 150000001,
          "nivel4": "150000001",
          "id_nivel4": 150000001
      }
    ];
    this.alarmas = this.alarmas.map((e,i) => {
      let position = i+1;
      return {...e, position}
    });
    this.dataSource.data = this.alarmas;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    /*
    const idAtribuible = PARAMETROS.ID_CATALOGO_ATRIBUIBLE;
    this.configuracionService.consultaInfo(idAtribuible).subscribe(
      (response: JEIS_RESPONSE) => {
        if (response.pnerrorOut == 0 && response.pvresultadoOut != '') {
          this.alarmas = <AlarmaSGA[]> response.pvresultadoOut.datos.registro;
          this.alarmas = this.alarmas.map((e,i) => {
            let position = i+1;
            return {...e, position}
          });
          this.dataSource.data = this.alarmas;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      (error: HttpErrorResponse) => {
        this.alertMessageService.showMessage.next({
          mensaje: MENSAJES.UNKNOWN_ERROR,
          tipo: "error"
        });
      }
    );*/
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  modificar(alarma){
    const dialogRef = this.dialog.open(NuevaAlarmaComponent, {
      width: '700px',
      height: '100%',
      data: {
        modo: 'Editar',
        alarma: alarma
      }
    });
  }

}
