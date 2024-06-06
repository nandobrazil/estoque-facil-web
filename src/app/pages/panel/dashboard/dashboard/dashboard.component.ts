import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../services/dashboard.service";
import {Table} from "primeng/table";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  knobValue: number = 90;

  selectedWeek: any;

  weeks: any[] = [];

  barData: any;

  barOptions: any;

  pieData: any;

  pieOptions: any;

  products: any[] = [];


  cols: any[] = [];

  isProd = environment.production;

  constructor(
    private dashboardService: DashboardService,
  ) {
  }

  ngOnInit(): void {
    this.weeks = [
      {
        label: 'Últ. Semana',
        value: 0,
        data: [
          [65, 59, 80, 81, 56, 55, 40],
          [28, 48, 40, 19, 86, 27, 90],
        ],
      },
      {
        label: 'Esta Semana',
        value: 1,
        data: [
          [35, 19, 40, 61, 16, 55, 30],
          [48, 78, 10, 29, 76, 77, 10],
        ],
      },
    ];

    this.selectedWeek = this.weeks[0];
    this.initCharts();
    this.dashboardService
      .getProductsSmall()
      .then((data) => (this.products = data));

    this.cols = [
      { header: 'Nome', field: 'name' },
      { header: 'Categoria', field: 'category' },
      { header: 'Preço', field: 'price' },
      { header: 'Status', field: 'inventoryStatus' },
    ];
  }

  async initCharts() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder =
      documentStyle.getPropertyValue('--surface-border');

    this.barData = {
      labels: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'],
      datasets: [
        {
          label: 'Receita',
          backgroundColor:
            documentStyle.getPropertyValue('--primary-500'),
          barThickness: 12,
          borderRadius: 12,
          data: this.selectedWeek.data[0],
        },
        {
          label: 'Lucro',
          backgroundColor:
            documentStyle.getPropertyValue('--primary-200'),
          barThickness: 12,
          borderRadius: 12,
          data: this.selectedWeek.data[1],
        },
      ],
    };

    this.pieData = {
      labels: ['Celulares', 'Consoles', 'Computadores'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue('--primary-700'),
            documentStyle.getPropertyValue('--primary-400'),
            documentStyle.getPropertyValue('--primary-100'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--primary-600'),
            documentStyle.getPropertyValue('--primary-300'),
            documentStyle.getPropertyValue('--primary-200'),
          ],
        },
      ],
    };

    this.barOptions = {
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          labels: {
            color: textColor,
            usePointStyle: true,
            font: {
              weight: 700,
            },
            padding: 28,
          },
          position: 'bottom',
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    this.pieOptions = {
      animation: {
        duration: 0,
      },
      plugins: {
        legend: {
          labels: {
            color: textColor,
            usePointStyle: true,
            font: {
              weight: 700,
            },
            padding: 28,
          },
          position: 'bottom',
        },
      },
    };
  }

  onWeekChange() {
    let newBarData = { ...this.barData };
    newBarData.datasets[0].data = this.selectedWeek.data[0];
    newBarData.datasets[1].data = this.selectedWeek.data[1];
    this.barData = newBarData;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(
      (event.target as HTMLInputElement).value,
      'contains'
    );
  }
}
