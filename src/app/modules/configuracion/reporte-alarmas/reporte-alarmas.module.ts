import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReporteAlarmasComponent } from './reporte-alarmas.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
	declarations: [ReporteAlarmasComponent],
	imports: [
		CommonModule,
		SharedModule,
		FormsModule
	],
	exports: [],
	providers: [],
})
export class ReporteAlarmasModule {}
