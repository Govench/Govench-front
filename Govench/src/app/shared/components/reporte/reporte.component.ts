import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReportService } from '../../../core/services/report/report.service';

@Component({


  selector: 'app-reporte',
  standalone: true,
  imports: [],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss'
})
export class ReporteComponent {
  constructor(
    private reportService: ReportService,
    private snackBar: MatSnackBar
  ) { }

  downloadReport() {
    this.reportService.downloadGraphicReport().subscribe({
      next: (response: Blob) => {
        console.log('Response received:', response);
        if (!response || response.size === 0) {
          this.showSnackBar('No hay datos disponibles para generar el reporte.');
      } else { 
        this.downloadFile(response, 'reporte.pdf');
      }
      },
      error: () => {
        this.showSnackBar('Ocurrió un error al intentar generar el reporte.');
      }
    });
  }

  private downloadFile(blob: Blob, fileName: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private showSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}