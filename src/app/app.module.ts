import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AlarmaService } from './core/services/alarma.service';
import { FileService } from './core/services/file.service';
import { WorkflowService } from './core/services/workflow.service';
import { AuthService } from './core/authentication/auth.service';
import { HomeModule } from './modules/home/home.module';
import { SharedModule } from './shared/shared.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { AuthGuard } from './core/guards/auth.guard';
import { AdministracionModule } from './modules/administracion/administracion.module';
import { SolicitudesModule } from './modules/solicitudes/solicitudes.module';
import { TokenInterceptor } from './core/interceptors/token-interceptor.interceptor';
import { UsrModulesGuard } from './core/guards/usr_modules.guard';
import { ReportesModule } from './modules/reportes/reportes.module';
import { ConfiguracionService } from './core/services/configuracion.service';
import { ConfiguracionModule } from './modules/configuracion/configuracion.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		CoreModule,
		SharedModule,
		AdministracionModule,
    ConfiguracionModule,
		HomeModule,
		ReportesModule,
		SolicitudesModule,
		UsuariosModule
	],
	providers: [
		AlarmaService,
		FileService,
		WorkflowService,
    AuthService,
    ConfiguracionService,
		AuthGuard,
		UsrModulesGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
