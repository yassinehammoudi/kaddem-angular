import { Component, OnInit } from '@angular/core';

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/university/list",
    title: "Universities",
    rtlTitle: "الرموز",
    icon: "icon-bank",
    class: ""
  },
  {
    path: "/department/list",
    title: "Department",
    rtlTitle: "خرائط",
    icon: "icon-vector",
    class: "" },
  {
    path: "/team/list",
    title: "Teams",
    rtlTitle: "إخطارات",
    icon: "icon-badge",
    class: ""
  },

  {
    path: "/student/list",
    title: "Students",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/contract/list",
    title: "Contracts",
    rtlTitle: "قائمة الجدول",
    icon: "icon-paper",
    class: ""
  },
];


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'  ]
})
export class SideBarComponent implements OnInit {

  menuItems: any[];

  constructor() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  ngOnInit(): void {
  }

}
