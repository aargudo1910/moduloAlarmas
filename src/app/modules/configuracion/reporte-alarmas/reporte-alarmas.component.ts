import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AlarmaReporte } from 'src/app/core/models/alarmas.model';
import { AlarmaService } from 'src/app/core/services/alarma.service';
import { Response } from 'src/app/core/models/response.model';
import { AuthService } from 'src/app/core/authentication/auth.service';
import {
	trigger,
	state,
	style,
	animate,
	transition,
} from '@angular/animations';

import { FileService } from 'src/app/core/services/file.service';
import { AlertMessagesService } from 'src/app/shared/services/alert-messages.service';
import { WorkflowService } from 'src/app/core/services/workflow.service';
import { UtilService } from 'src/app/shared/services/utils.service';
import * as MENSAJES from 'src/app/core/properties/messages.parameters';
import { JEIS_RESPONSE } from 'src/app/core/models/framework.model';
import { Area } from 'src/app/core/models/usuario.model';

@Component({
	selector: 'app-reporte-alarmas',
	templateUrl: './reporte-alarmas.component.html',
	styleUrls: ['./reporte-alarmas.component.scss'],
})
export class ReporteAlarmasComponent implements OnInit {

	listaAlarmas: AlarmaReporte[] = [];
	states: any;
	isLoadingAlarmas: boolean = true;
	closeResult: string;
	totalAlarmas: number = 0; //quitar =0
	paginaActual = 1;
	nroAlarmasCargadas: number = 0;
	opcionPaginacion: string = "mas";
	nroAlarmasCargadasAnterior: number;

	constructor(private alarmaService: AlarmaService,
		private authService: AuthService,
		private workflowService: WorkflowService,
		private alertMessageService: AlertMessagesService,
		private fileService: FileService,
		private modalService: NgbModal,
		private utilService: UtilService) { }

	ngOnInit() {
		this.obtenerAlarmas("");
	}

	obtenerAlarmas(filtros?: string){

	}

	mostrarMas(){
		this.opcionPaginacion = "mas";
		this.paginaActual++;
		this.isLoadingAlarmas = true;
		this.obtenerAlarmas('');
	}

	mostrarMenos(){
		this.opcionPaginacion = "menos";
		this.paginaActual--;
		this.isLoadingAlarmas = true;
		this.obtenerAlarmas("");
	}

	showDetail(i: number) {
		this.states[i] = this.states[i] == 'hide' ? 'show' : 'hide';
	}

	onGenerarReporte() {
		this.fileService.crearReporteGeneral(this.listaAlarmas);
	}

	open(content) {
	this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
}
