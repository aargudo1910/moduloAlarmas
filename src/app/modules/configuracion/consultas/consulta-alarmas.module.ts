import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';

import { SharedModule } from 'src/app/shared/shared.module';
import { ConsultaAlarmasComponent } from './consulta-alarmas.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	declarations: [ConsultaAlarmasComponent],
	imports: [
		CommonModule,
		FormsModule,
		SharedModule,
		MatTableModule,
		MatFormFieldModule,
		MatSortModule,
		MatPaginatorModule,
		MatInputModule,
		MatCheckboxModule,
		MatButtonModule,
		MatDialogModule,
		MatRadioModule,
		MatSelectModule
	],
	exports: [],
	providers: []
})
export class ConsultaAlarmasModule { }
