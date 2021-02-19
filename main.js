(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "+XTi":
/*!**************************************************!*\
  !*** ./src/app/pages/custom/custom.component.ts ***!
  \**************************************************/
/*! exports provided: CustomComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomComponent", function() { return CustomComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _dynamic_component_host_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dynamic-component-host.directive */ "UgDJ");
/* harmony import */ var src_app_shared_components_custom_small_small_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared-components/custom/small/small.component */ "44pM");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nebular/theme */ "aceb");
/* harmony import */ var src_app_services_custom_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/custom.service */ "oOhd");
/* harmony import */ var _services_utils_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../services/utils.service */ "0ygI");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_components_custom_component_selector_component_selector_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared-components/custom/component-selector/component-selector.component */ "jM4B");
/* harmony import */ var _shared_components_custom_add_button_add_button_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared-components/custom/add-button/add-button.component */ "dQQ/");












function CustomComponent_ngx_add_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ngx-add-button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CustomComponent_ngx_add_button_7_Template_ngx_add_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r1.addComponent(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("size", "small")("haveOption", false);
} }
const _c0 = function (a0) { return { "rotate": a0 }; };
class CustomComponent {
    constructor(cfr, sidebarService, renderer2, customService, utilsService) {
        this.cfr = cfr;
        this.sidebarService = sidebarService;
        this.renderer2 = renderer2;
        this.customService = customService;
        this.utilsService = utilsService;
        this.sideState = false;
        this.editable = true;
        this.removeable = false;
        this.childUniqueKey = 0;
        this.componentsIndex = [];
        this.componentsReferences = Array();
        this.selectedYear = 2018;
        this.wrappers = {
            small: src_app_shared_components_custom_small_small_component__WEBPACK_IMPORTED_MODULE_3__["SmallComponent"],
        };
        this.sizeMap = {
            small: 'col-md-3',
        };
        this.shakeIdx = ['1', '2', '3'];
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.loadComponents();
    }
    createComponent(component, isNew) {
        // STEP1: 收合側元件選單
        this.sideBarCollapse();
        // STEP2: 開始產生元件
        this.dcHosts.forEach(host => {
            // 要拿來放元件，view 的參照位置
            const vcRef = host.viewContainerRef;
            // 製作被選擇要出來的元件，targetComponent 目標功能元件, wrapperComponent 決定大小的外框元件
            const allComponents = this.utilsService.getAllComponents();
            const targetComponent = allComponents.filter(e => e.name === component.name)[0].val;
            const wrapperComponent = this.wrappers['small'];
            const wrapperFactory = this.cfr.resolveComponentFactory(wrapperComponent);
            const componentFactory = this.cfr.resolveComponentFactory(targetComponent);
            // 先產生目標圖表元件
            const targetRef = vcRef.createComponent(componentFactory);
            // 準備元件的input資料
            this.customService.updateInputData(component, targetRef, this.selectedYear);
            // 在參照位置產生外框元件，並且透過 ng-content，將目標圖表元件放進來
            const wrapperRef = vcRef.createComponent(wrapperFactory, vcRef.length, undefined, [[targetRef.location.nativeElement]]);
            // 用 renderer2 在產生出來的元件上 加上 class
            this.renderer2.addClass(wrapperRef.location.nativeElement, this.sizeMap['small']);
            // 記錄 component 唯一值
            wrapperRef.instance['uniqueKey'] = ++this.childUniqueKey;
            // 給予不同的 shakeIdx 製造刪除動畫的隨機感
            wrapperRef.instance['shakeIdx'] = this.shakeIdx[this.childUniqueKey % 3];
            // 儲存 wrapper 跟 target 的 ref，之後更新資料、刪除元件時會用
            this.customService.pushWrapperRefs(wrapperRef);
            this.customService.pushChartRefs(targetRef);
            // 如果開著刪除模式，新增的元件也要開啟刪除模式
            this.customService.refreshRemoveMode(this.removeable);
            // 訂閱刪除事件
            const self = this;
            wrapperRef.instance['remove'].subscribe(componentIdx => {
                self.customService.removeComponent(componentIdx);
            });
        });
        // STEP3: 儲存目前有哪些 components
        if (isNew) {
            this.customService.pushComponent(component.name);
        }
    }
    // 編輯元件模式
    toggleEditMode(event) {
        this.editable = event;
    }
    // 移除元件模式
    toggleRemoveMode(event) {
        // 把每一個元件加上 remove 的 class 以顯示動畫
        this.removeable = event;
        this.customService.refreshRemoveMode(this.removeable);
    }
    // 選擇資料年分
    selectedChange() {
    }
    loadComponents() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // 讀取使用者儲存了頁面有哪些元件，並且一一創造出來
            const components = yield this.customService.getComponentsArray();
            components
                .map(c => this.utilsService.getAllComponents().find(e => e.name === c))
                .forEach(c => this.createComponent(c, false));
        });
    }
    // 側選單相關
    sideBarExpand() {
        // 收合側元件選單
        this.sideState = true;
        this.sidebarService.expand('selector');
    }
    sideBarCollapse() {
        // 收合側元件選單
        this.sideState = false;
        this.sidebarService.collapse('selector');
    }
    sidebarToggle() {
        this.sideState = !this.sideState;
        this.sidebarService.toggle(true, 'selector');
    }
    addComponent() {
        this.sideBarExpand();
    }
    chooseSize() {
        this.addComponent();
    }
}
CustomComponent.ɵfac = function CustomComponent_Factory(t) { return new (t || CustomComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbSidebarService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_custom_service__WEBPACK_IMPORTED_MODULE_5__["CustomService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_utils_service__WEBPACK_IMPORTED_MODULE_6__["UtilsService"])); };
CustomComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CustomComponent, selectors: [["app-custom"]], viewQuery: function CustomComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_dynamic_component_host_directive__WEBPACK_IMPORTED_MODULE_2__["DynamicComponentHostDirective"], true);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.dcHosts = _t);
    } }, decls: 20, vars: 5, consts: [[1, "setting"], ["status", "primary", "labelPosition", "start", "checked", "true", 3, "checkedChange"], ["icon", "settings-outline"], ["status", "danger", "labelPosition", "start", 3, "checkedChange"], ["icon", "trash-2-outline"], [1, "row", "w-100", "small-block"], ["appDynamicComponentHost", ""], ["class", "col-md-3 small-height", 3, "size", "haveOption", "click", 4, "ngIf"], ["tag", "selector", "end", "", "state", "collapsed", 1, "sidebar", "rightSidebar"], ["href", "javascript: void(0)", 1, "toggleBtn", 3, "click"], ["icon", "chevron-right-outline", 3, "ngClass"], [3, "choosed"], ["placeholder", "\u9078\u64C7\u8CC7\u6599\u5E74\u5206", 1, "right", 3, "selected", "selectedChange"], ["value", "2018"], ["value", "2019"], ["value", "2020"], [1, "col-md-3", "small-height", 3, "size", "haveOption", "click"]], template: function CustomComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "nb-toggle", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("checkedChange", function CustomComponent_Template_nb_toggle_checkedChange_1_listener($event) { return ctx.toggleEditMode($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "nb-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "nb-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("checkedChange", function CustomComponent_Template_nb_toggle_checkedChange_3_listener($event) { return ctx.toggleRemoveMode($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "nb-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainer"](6, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, CustomComponent_ngx_add_button_7_Template, 1, 2, "ngx-add-button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "hr");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "nb-sidebar", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CustomComponent_Template_a_click_10_listener() { return ctx.sidebarToggle(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "nb-icon", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "app-component-selector", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("choosed", function CustomComponent_Template_app_component_selector_choosed_12_listener($event) { return ctx.createComponent($event, true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "nb-select", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectedChange", function CustomComponent_Template_nb_select_selectedChange_13_listener($event) { return ctx.selectedYear = $event; })("selectedChange", function CustomComponent_Template_nb_select_selectedChange_13_listener() { return ctx.selectedChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "nb-option", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "2018");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "nb-option", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "2019");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "nb-option", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "2020");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.editable);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](3, _c0, !ctx.sideState));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("selected", ctx.selectedYear);
    } }, directives: [_nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbToggleComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbIconComponent"], _dynamic_component_host_directive__WEBPACK_IMPORTED_MODULE_2__["DynamicComponentHostDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbSidebarComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgClass"], _shared_components_custom_component_selector_component_selector_component__WEBPACK_IMPORTED_MODULE_8__["ComponentSelectorComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbSelectComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbOptionComponent"], _shared_components_custom_add_button_add_button_component__WEBPACK_IMPORTED_MODULE_9__["AddButtonComponent"]], styles: [".rightSidebar[_ngcontent-%COMP%], .rightSidebar.expanded[_ngcontent-%COMP%] {\n  display: block;\n  position: absolute;\n  right: -2.25rem;\n  width: 30rem;\n  transition: all 0.4s;\n  -webkit-transition: all 0.4s;\n  transition-timing-function: ease-out;\n  -webkit-transition-timing-function: ease-out;\n}\n\n  .rightSidebar > .main-container {\n  height: 100vh !important;\n  top: 0rem !important;\n  width: 30rem !important;\n}\n\n  .rightSidebar * .scrollable {\n  overflow-y: visible !important;\n  overflow-x: visible !important;\n}\n\n.toggleBtn[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 30%;\n  left: -9px;\n  height: 50px;\n  width: 30px;\n  border-radius: 90px 0 0 90px;\n  padding-top: 7px;\n  padding-left: 4px;\n  line-height: 12px;\n  font-size: 12px;\n  margin: 0;\n  background: #151a30;\n  box-shadow: -9px -9px 20px #1d2443;\n  text-decoration: none;\n  text-align: center;\n  border-right: none;\n  box-sizing: border-box;\n  overflow: visible;\n}\n\n.toggleBtn[_ngcontent-%COMP%]   nb-icon[_ngcontent-%COMP%] {\n  font-size: 3em;\n  transition: all 0.6s;\n  -webkit-transition: all 0.6s;\n  transition-timing-function: ease-out;\n  -webkit-transition-timing-function: ease-out;\n}\n\n.toggleBtn[_ngcontent-%COMP%]   nb-icon.rotate[_ngcontent-%COMP%] {\n  transform: rotate(-180deg);\n  transition: all 0.6s;\n  -webkit-transition: all 0.6s;\n  transition-timing-function: ease-out;\n  -webkit-transition-timing-function: ease-out;\n}\n\n.flex-fill-height[_ngcontent-%COMP%] {\n  flex-grow: 0.5;\n  flex-shrink: 0.5;\n  flex-basis: 10%;\n}\n\n.small-height[_ngcontent-%COMP%] {\n  height: 300px;\n}\n\n.setting[_ngcontent-%COMP%] {\n  position: relative;\n  float: right;\n}\n\n.setting[_ngcontent-%COMP%]   nb-toggle[_ngcontent-%COMP%] {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n\nngx-add-button[_ngcontent-%COMP%] {\n  padding-top: 15px;\n  padding-bottom: 15px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxjdXN0b20uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7O0VBRUUsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLFlBTmM7RUFPZCxvQkFBQTtFQUNBLDRCQUFBO0VBQ0Esb0NBQUE7RUFDQSw0Q0FBQTtBQURGOztBQUdBO0VBQ0Usd0JBQUE7RUFDQSxvQkFBQTtFQUNBLHVCQUFBO0FBQUY7O0FBRUE7RUFDRSw4QkFBQTtFQUNBLDhCQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSw0QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQ0FBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsaUJBQUE7QUFFRjs7QUFBRTtFQUNFLGNBQUE7RUFDQSxvQkFBQTtFQUNBLDRCQUFBO0VBQ0Esb0NBQUE7RUFDQSw0Q0FBQTtBQUVKOztBQUFFO0VBQ0UsMEJBQUE7RUFDQSxvQkFBQTtFQUNBLDRCQUFBO0VBQ0Esb0NBQUE7RUFDQSw0Q0FBQTtBQUVKOztBQVFBO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQUxGOztBQU9BO0VBQ0UsYUFBQTtBQUpGOztBQVFBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0FBTEY7O0FBTUU7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0FBSko7O0FBU0E7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFORiIsImZpbGUiOiJjdXN0b20uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyDlj7PlgbTlhYPku7bpgbjllq5cclxuJHNpZGViYXItd2lkdGg6IDMwcmVtO1xyXG4ucmlnaHRTaWRlYmFyLFxyXG4ucmlnaHRTaWRlYmFyLmV4cGFuZGVkIHtcclxuICBkaXNwbGF5OiBibG9jaztcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgcmlnaHQ6IC0yLjI1cmVtO1xyXG4gIHdpZHRoOiAkc2lkZWJhci13aWR0aDtcclxuICB0cmFuc2l0aW9uOiBhbGwgMC40cztcclxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjRzO1xyXG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcclxuICAtd2Via2l0LXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcclxufVxyXG46Om5nLWRlZXAgLnJpZ2h0U2lkZWJhciA+IC5tYWluLWNvbnRhaW5lciB7XHJcbiAgaGVpZ2h0OiAxMDB2aCAhaW1wb3J0YW50O1xyXG4gIHRvcDogMHJlbSAhaW1wb3J0YW50O1xyXG4gIHdpZHRoOiAkc2lkZWJhci13aWR0aCAhaW1wb3J0YW50O1xyXG59XHJcbjo6bmctZGVlcCAucmlnaHRTaWRlYmFyICogLnNjcm9sbGFibGUge1xyXG4gIG92ZXJmbG93LXk6IHZpc2libGUgIWltcG9ydGFudDtcclxuICBvdmVyZmxvdy14OiB2aXNpYmxlICFpbXBvcnRhbnQ7XHJcbn1cclxuLnRvZ2dsZUJ0biB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRvcDogMzAlO1xyXG4gIGxlZnQ6IC05cHg7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIHdpZHRoOiAzMHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDkwcHggMCAwIDkwcHg7XHJcbiAgcGFkZGluZy10b3A6IDdweDtcclxuICBwYWRkaW5nLWxlZnQ6IDRweDtcclxuICBsaW5lLWhlaWdodDogMTJweDtcclxuICBmb250LXNpemU6IDEycHg7XHJcbiAgbWFyZ2luOiAwO1xyXG4gIGJhY2tncm91bmQ6ICMxNTFhMzA7XHJcbiAgYm94LXNoYWRvdzogLTlweCAtOXB4IDIwcHggIzFkMjQ0MztcclxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJvcmRlci1yaWdodDogbm9uZTtcclxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xyXG5cclxuICBuYi1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogM2VtO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNnM7XHJcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjZzO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xyXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XHJcbiAgfVxyXG4gIG5iLWljb24ucm90YXRlIHtcclxuICAgIHRyYW5zZm9ybTogcm90YXRlKC0xODBkZWcpO1xyXG4gICAgdHJhbnNpdGlvbjogYWxsIDAuNnM7XHJcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjZzO1xyXG4gICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2Utb3V0O1xyXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XHJcbiAgfVxyXG59XHJcblxyXG4vLyByb3cg5Y2A5aGK5aSn5bCPXHJcbiVib3JkZXIge1xyXG4gIGJvcmRlcjogI2ZmZmZmZjtcclxuICBib3JkZXItd2lkdGg6IDJweDtcclxuICBib3JkZXItc3R5bGU6IHNvbGlkO1xyXG59XHJcbi5mbGV4LWZpbGwtaGVpZ2h0IHtcclxuICBmbGV4LWdyb3c6IDAuNTtcclxuICBmbGV4LXNocmluazogMC41O1xyXG4gIGZsZXgtYmFzaXM6IDEwJTtcclxufVxyXG4uc21hbGwtaGVpZ2h0IHtcclxuICBoZWlnaHQ6IDMwMHB4O1xyXG59XHJcblxyXG4vLyDkuIrmlrnmqKHlvI/oqr/mlbRcclxuLnNldHRpbmcge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBmbG9hdDogcmlnaHQ7XHJcbiAgbmItdG9nZ2xlIHtcclxuICAgIHBhZGRpbmctbGVmdDogMXJlbTtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDFyZW07XHJcbiAgfVxyXG59XHJcblxyXG4vLyBibG9jayDljYDloYrlpKflsI9cclxubmd4LWFkZC1idXR0b24ge1xyXG4gIHBhZGRpbmctdG9wOiAxNXB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiAxNXB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CustomComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-custom',
                templateUrl: './custom.component.html',
                styleUrls: ['./custom.component.scss']
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ComponentFactoryResolver"] }, { type: _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbSidebarService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer2"] }, { type: src_app_services_custom_service__WEBPACK_IMPORTED_MODULE_5__["CustomService"] }, { type: _services_utils_service__WEBPACK_IMPORTED_MODULE_6__["UtilsService"] }]; }, { dcHosts: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChildren"],
            args: [_dynamic_component_host_directive__WEBPACK_IMPORTED_MODULE_2__["DynamicComponentHostDirective"]]
        }] }); })();


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! G:\Projects\dynamic-component\day2\dynamic-component\src\main.ts */"zUnb");


/***/ }),

/***/ "0ygI":
/*!*******************************************!*\
  !*** ./src/app/services/utils.service.ts ***!
  \*******************************************/
/*! exports provided: UtilsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilsService", function() { return UtilsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_components_bar_chart_bar_chart_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared-components/bar-chart/bar-chart.component */ "LJHG");
/* harmony import */ var _shared_components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared-components/line-chart/line-chart.component */ "ra16");
/* harmony import */ var _shared_components_pie_chart_pie_chart_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared-components/pie-chart/pie-chart.component */ "Gl7V");





class UtilsService {
    constructor() {
        this.Page1Components = [
            {
                name: '折線圖',
                val: _shared_components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_2__["LineChartComponent"],
                description: '',
                img: './assets/line.jpg',
            },
            {
                name: '長條圖',
                val: _shared_components_bar_chart_bar_chart_component__WEBPACK_IMPORTED_MODULE_1__["BarChartComponent"],
                description: '',
                img: './assets/bar.jpg',
            },
        ];
        this.Page2Components = [
            {
                name: '圓餅圖',
                val: _shared_components_pie_chart_pie_chart_component__WEBPACK_IMPORTED_MODULE_3__["PieChartComponent"],
                description: '',
                img: './assets/pie.jpg',
            }
        ];
    }
    getData(name, year) {
        if (name === '長條圖') {
            const dict = {
                2018: [3, 5, 4, 6, 7, 9, 15, 11, 12, 9, 6, 3],
                2019: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                2020: [13, 15, 14, 16, 17, 19, 15, 11, 12, 9, 6, 3],
            };
            const data = {
                year: year,
                xType: 'category',
                yType: 'value',
                xAxis: Array.from([...Array(12).keys()].map(e => e + 1)),
                yAxis: dict[year],
            };
            return data;
        }
        else if (name === '折線圖') {
            const dict = {
                2018: [3, 5, 4, 6, 7, 9, 15, 11, 12, 9, 6, 3],
                2019: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                2020: [13, 15, 14, 16, 17, 19, 15, 11, 12, 9, 6, 3],
            };
            const data = {
                year: year,
                xAxis: Array.from([...Array(12).keys()].map(e => e + 1)),
                lines: [
                    { 'name': '使用率', 'values': dict[year] }
                ],
            };
            return data;
        }
        else {
            const dict = {
                2018: [10, 90],
                2019: [40, 60],
                2020: [60, 40],
            };
            const data = {
                year: year,
                legend: ['已註冊', '未註冊'],
                data: dict[year]
            };
            return data;
        }
    }
    getAllComponents() {
        return [...this.Page1Components, ...this.Page2Components];
    }
}
UtilsService.ɵfac = function UtilsService_Factory(t) { return new (t || UtilsService)(); };
UtilsService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UtilsService, factory: UtilsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UtilsService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root',
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "44pM":
/*!*******************************************************************!*\
  !*** ./src/app/shared-components/custom/small/small.component.ts ***!
  \*******************************************************************/
/*! exports provided: SmallComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SmallComponent", function() { return SmallComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "R0Ic");
/* harmony import */ var ng_animate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ng-animate */ "5Rqa");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nebular/theme */ "aceb");






function SmallComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SmallComponent_div_1_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.removeComponent(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "nb-icon", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = ["*"];
class SmallComponent {
    constructor() {
        this.removable = false;
        this.remove = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        if (changes.removable && changes.removable.currentValue) {
            this.removable = changes.removable.currentValue;
        }
    }
    removeComponent() {
        this.remove.emit(this.uniqueKey);
    }
    randomShake() {
        if (this.removable) {
            return `shake-${this.shakeIdx}`;
        }
        else {
            return '';
        }
    }
}
SmallComponent.ɵfac = function SmallComponent_Factory(t) { return new (t || SmallComponent)(); };
SmallComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SmallComponent, selectors: [["ngx-small"]], inputs: { removable: "removable", uniqueKey: "uniqueKey", shakeIdx: "shakeIdx" }, outputs: { remove: "remove" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], ngContentSelectors: _c0, decls: 3, vars: 3, consts: [[1, "small-height", "w-100", "padding", 3, "ngClass"], ["class", "container", 4, "ngIf"], [1, "container"], ["nbButton", "", "filled", "", "status", "danger", 1, "close", 3, "click"], ["icon", "close-outline"]], template: function SmallComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, SmallComponent_div_1_Template, 3, 0, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@bounceIn", undefined)("ngClass", ctx.randomShake());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.removable);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbButtonComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbIconComponent"]], styles: [".container[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.close[_ngcontent-%COMP%] {\n  position: absolute !important;\n  top: -10px;\n  right: -15px;\n  padding: 2px !important;\n  border-radius: 20px;\n}\n\n.shake-1[_ngcontent-%COMP%]:hover, .shake-2[_ngcontent-%COMP%]:hover, .shake-3[_ngcontent-%COMP%]:hover {\n  animation: none;\n}\n\n.shake-1[_ngcontent-%COMP%] {\n  animation: shake 1.1s;\n  animation-delay: 0.2s;\n  animation-iteration-count: infinite;\n}\n\n.shake-2[_ngcontent-%COMP%] {\n  animation: shake 1.1s;\n  animation-delay: 0.1s;\n  animation-iteration-count: infinite;\n}\n\n.shake-3[_ngcontent-%COMP%] {\n  animation: shake 1.1s;\n  animation-delay: 0s;\n  animation-iteration-count: infinite;\n}\n\n@keyframes shake {\n  0% {\n    transform: translate(1px, 1px) rotate(0deg);\n  }\n  10% {\n    transform: translate(-1px, -2px) rotate(-1deg);\n  }\n  20% {\n    transform: translate(-3px, 0px) rotate(1deg);\n  }\n  30% {\n    transform: translate(3px, 2px) rotate(0deg);\n  }\n  40% {\n    transform: translate(1px, -1px) rotate(1deg);\n  }\n  50% {\n    transform: translate(-1px, 2px) rotate(-1deg);\n  }\n  60% {\n    transform: translate(-3px, 1px) rotate(0deg);\n  }\n  70% {\n    transform: translate(3px, 1px) rotate(-1deg);\n  }\n  80% {\n    transform: translate(-1px, -1px) rotate(1deg);\n  }\n  90% {\n    transform: translate(1px, 2px) rotate(0deg);\n  }\n  100% {\n    transform: translate(1px, -2px) rotate(-1deg);\n  }\n}\n\n.small-height[_ngcontent-%COMP%] {\n  height: 300px;\n}\n\n.padding[_ngcontent-%COMP%] {\n  padding-top: 15px;\n  padding-bottom: 15px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcc21hbGwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtBQUNGOztBQUNBO0VBQ0UsNkJBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBRUEsbUJBQUE7QUFDRjs7QUFDQTtFQUNFLGVBQUE7QUFFRjs7QUFBQTtFQUNFLHFCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQ0FBQTtBQUdGOztBQURBO0VBQ0UscUJBQUE7RUFDQSxxQkFBQTtFQUNBLG1DQUFBO0FBSUY7O0FBRkE7RUFDRSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUNBQUE7QUFLRjs7QUFIQTtFQUNFO0lBQ0UsMkNBQUE7RUFNRjtFQUpBO0lBQ0UsOENBQUE7RUFNRjtFQUpBO0lBQ0UsNENBQUE7RUFNRjtFQUpBO0lBQ0UsMkNBQUE7RUFNRjtFQUpBO0lBQ0UsNENBQUE7RUFNRjtFQUpBO0lBQ0UsNkNBQUE7RUFNRjtFQUpBO0lBQ0UsNENBQUE7RUFNRjtFQUpBO0lBQ0UsNENBQUE7RUFNRjtFQUpBO0lBQ0UsNkNBQUE7RUFNRjtFQUpBO0lBQ0UsMkNBQUE7RUFNRjtFQUpBO0lBQ0UsNkNBQUE7RUFNRjtBQUNGOztBQUpBO0VBQ0UsYUFBQTtBQU1GOztBQUpBO0VBQ0UsaUJBQUE7RUFDQSxvQkFBQTtBQU9GIiwiZmlsZSI6InNtYWxsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRhaW5lciB7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG59XHJcbi5jbG9zZSB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7XHJcbiAgdG9wOiAtMTBweDtcclxuICByaWdodDogLTE1cHg7XHJcbiAgcGFkZGluZzogMnB4ICFpbXBvcnRhbnQ7XHJcbiAgLy8gYm9yZGVyLWNvbG9yOiAjMjIyYjQ1ICFpbXBvcnRhbnQ7XHJcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcclxufVxyXG4uc2hha2UtMTpob3ZlciwgLnNoYWtlLTI6aG92ZXIsIC5zaGFrZS0zOmhvdmVyIHtcclxuICBhbmltYXRpb246IG5vbmU7XHJcbn1cclxuLnNoYWtlLTEge1xyXG4gIGFuaW1hdGlvbjogc2hha2UgMS4xcztcclxuICBhbmltYXRpb24tZGVsYXk6IDAuMnM7XHJcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XHJcbn1cclxuLnNoYWtlLTIge1xyXG4gIGFuaW1hdGlvbjogc2hha2UgMS4xcztcclxuICBhbmltYXRpb24tZGVsYXk6IDAuMXM7XHJcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XHJcbn1cclxuLnNoYWtlLTMge1xyXG4gIGFuaW1hdGlvbjogc2hha2UgMS4xcztcclxuICBhbmltYXRpb24tZGVsYXk6IDBzO1xyXG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xyXG59XHJcbkBrZXlmcmFtZXMgc2hha2Uge1xyXG4gIDAlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDFweCwgMXB4KSByb3RhdGUoMGRlZyk7XHJcbiAgfVxyXG4gIDEwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMXB4LCAtMnB4KSByb3RhdGUoLTFkZWcpO1xyXG4gIH1cclxuICAyMCUge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTNweCwgMHB4KSByb3RhdGUoMWRlZyk7XHJcbiAgfVxyXG4gIDMwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgzcHgsIDJweCkgcm90YXRlKDBkZWcpO1xyXG4gIH1cclxuICA0MCUge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMXB4LCAtMXB4KSByb3RhdGUoMWRlZyk7XHJcbiAgfVxyXG4gIDUwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtMXB4LCAycHgpIHJvdGF0ZSgtMWRlZyk7XHJcbiAgfVxyXG4gIDYwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtM3B4LCAxcHgpIHJvdGF0ZSgwZGVnKTtcclxuICB9XHJcbiAgNzAlIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKDNweCwgMXB4KSByb3RhdGUoLTFkZWcpO1xyXG4gIH1cclxuICA4MCUge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTFweCwgLTFweCkgcm90YXRlKDFkZWcpO1xyXG4gIH1cclxuICA5MCUge1xyXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoMXB4LCAycHgpIHJvdGF0ZSgwZGVnKTtcclxuICB9XHJcbiAgMTAwJSB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxcHgsIC0ycHgpIHJvdGF0ZSgtMWRlZyk7XHJcbiAgfVxyXG59XHJcbi5zbWFsbC1oZWlnaHQge1xyXG4gIGhlaWdodDogMzAwcHg7XHJcbn1cclxuLnBhZGRpbmcge1xyXG4gIHBhZGRpbmctdG9wOiAxNXB4O1xyXG4gIHBhZGRpbmctYm90dG9tOiAxNXB4O1xyXG59XHJcbiJdfQ== */"], data: { animation: [
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('bounceIn', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["useAnimation"])(ng_animate__WEBPACK_IMPORTED_MODULE_2__["bounceIn"], {
                    params: { timing: 1, delay: 0 },
                }))]),
        ] } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SmallComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ngx-small',
                templateUrl: './small.component.html',
                styleUrls: ['./small.component.scss'],
                animations: [
                    Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('bounceIn', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('* => *', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["useAnimation"])(ng_animate__WEBPACK_IMPORTED_MODULE_2__["bounceIn"], {
                            params: { timing: 1, delay: 0 },
                        }))]),
                ],
            }]
    }], function () { return []; }, { removable: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], uniqueKey: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], shakeIdx: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], remove: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "Gl7V":
/*!********************************************************************!*\
  !*** ./src/app/shared-components/pie-chart/pie-chart.component.ts ***!
  \********************************************************************/
/*! exports provided: PieChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PieChartComponent", function() { return PieChartComponent; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors */ "OzVJ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nebular/theme */ "aceb");
/* harmony import */ var ngx_echarts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-echarts */ "DKVz");





class PieChartComponent {
    constructor() {
        this.data = {
            year: 2018,
            legend: [],
            data: []
        };
        this.pieColors = [
            {
                color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-primary-500'],
                shadow: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-primary-transparent-500'],
            },
            {
                color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-info-500'],
                shadow: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-info-transparent-500'],
            },
            {
                color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-success-500'],
                shadow: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-success-transparent-500'],
            },
            {
                color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-danger-500'],
                shadow: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-danger-transparent-500'],
            },
            {
                color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-warning-500'],
                shadow: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-warning-transparent-500'],
            },
            {
                color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-500'],
                shadow: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-transparent-500'],
            }
        ];
        this.pieChartOption = {};
    }
    getSeriesList(data, legend) {
        const seriesList = [];
        data.forEach((d, index) => {
            seriesList.push({
                value: d,
                name: legend[index],
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        shadowBlur: 20,
                        borderColor: this.pieColors[index].color,
                        shadowColor: this.pieColors[index].shadow,
                        color: this.pieColors[index].color
                    }
                }
            });
        });
        return seriesList;
    }
    drawChart(legend, total, list) {
        this.pieChartOption = {
            tooltip: {
                show: true
            },
            legend: {
                orient: 'vertical',
                data: legend,
                icon: 'circle',
                right: '3%',
                top: '5%',
                textStyle: {
                    color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-200'],
                    fontSize: 12
                }
            },
            series: [{
                    name: '',
                    type: 'pie',
                    clockWise: false,
                    startAngle: '90',
                    center: ['50%', '50%'],
                    radius: ['50%', '51%'],
                    hoverAnimation: false,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'outside',
                                formatter: (params) => {
                                    const percent = params.percent;
                                    return `${percent}%`;
                                },
                                textStyle: {
                                    align: 'center',
                                    baseline: 'middle',
                                    fontSize: 16,
                                    fontWeight: '100',
                                    lineHeight: 30,
                                    color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-100']
                                },
                                alignTo: 'edge',
                                margin: 30
                            },
                            labelLine: {
                                length: 10,
                                length2: 10,
                                show: true,
                                color: '#00ffff'
                            }
                        }
                    },
                    data: list,
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function (idx) {
                        return idx * 50;
                    }
                },
            ]
        };
    }
    selectedChange() {
        let newData = {
            legend: [],
            data: [],
        };
        if (this.selectedTime === '0') {
            newData = {
                legend: ['已註冊', '未註冊'],
                data: [this.data.data[0] - 10, 100 - (this.data.data[0] - 10)]
            };
        }
        else if (this.selectedTime === '1') {
            newData = {
                legend: ['已註冊', '未註冊'],
                data: [this.data.data[0] + 10, 100 - (this.data.data[0] + 10)]
            };
        }
        let total = 0;
        newData.data.forEach(value => { total += value; });
        const legend = newData.legend;
        const data = newData.data;
        const seriesList = this.getSeriesList(data, legend);
        this.drawChart(legend, total, seriesList);
        console.log(this.data);
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        if (changes.data && changes.data.currentValue) {
            this.data = changes.data.currentValue;
            let total = 0;
            this.data.data.forEach(value => { total += value; });
            const legend = this.data.legend;
            const data = this.data.data;
            const seriesList = this.getSeriesList(data, legend);
            this.drawChart(legend, total, seriesList);
        }
    }
}
PieChartComponent.ɵfac = function PieChartComponent_Factory(t) { return new (t || PieChartComponent)(); };
PieChartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: PieChartComponent, selectors: [["app-pie-chart"]], inputs: { data: "data" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]], decls: 11, vars: 3, consts: [[1, "full-content"], [1, "container"], ["placeholder", "\u9078\u64C7\u6642\u9593", 1, "right", 3, "selected", "selectedChange"], ["value", "0"], ["value", "1"], ["echarts", "", 1, "full-content", 3, "options"]], template: function PieChartComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nb-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "nb-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "nb-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectedChange", function PieChartComponent_Template_nb_select_selectedChange_4_listener($event) { return ctx.selectedTime = $event; })("selectedChange", function PieChartComponent_Template_nb_select_selectedChange_4_listener() { return ctx.selectedChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "nb-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "\u4E0A\u534A\u5E74");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "nb-option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "\u4E0B\u534A\u5E74");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "nb-card-body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.data.year, "\u5E74 \u5713\u9905\u5716 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("selected", ctx.selectedTime);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("options", ctx.pieChartOption);
    } }, directives: [_nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbCardComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbCardHeaderComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbSelectComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbOptionComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbCardBodyComponent"], ngx_echarts__WEBPACK_IMPORTED_MODULE_3__["NgxEchartsDirective"]], styles: [".full-content[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n}\n\n.container[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.right[_ngcontent-%COMP%] {\n  position: absolute;\n  right: -1rem;\n  top: -2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxwaWUtY2hhcnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FBQ0Y7O0FBQ0E7RUFDRSxrQkFBQTtBQUVGOztBQUFBO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtBQUdGIiwiZmlsZSI6InBpZS1jaGFydC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5mdWxsLWNvbnRlbnQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTAwJTtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxufVxyXG4uY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLnJpZ2h0IHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgcmlnaHQ6IC0xcmVtO1xyXG4gIHRvcDogLTJyZW07XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](PieChartComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-pie-chart',
                templateUrl: './pie-chart.component.html',
                styleUrls: ['./pie-chart.component.scss']
            }]
    }], function () { return []; }, { data: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();


/***/ }),

/***/ "LJHG":
/*!********************************************************************!*\
  !*** ./src/app/shared-components/bar-chart/bar-chart.component.ts ***!
  \********************************************************************/
/*! exports provided: BarChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarChartComponent", function() { return BarChartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../colors */ "OzVJ");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nebular/theme */ "aceb");
/* harmony import */ var ngx_echarts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-echarts */ "DKVz");





class BarChartComponent {
    constructor() {
        this.data = {
            year: 2018,
            xType: 'category',
            yType: 'value',
            xAxis: [],
            yAxis: [],
        };
        this.barChartOption = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                    offset: 0,
                                    color: 'rgba(0, 255, 233,0)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(255, 255, 255,1)',
                                }, {
                                    offset: 1,
                                    color: 'rgba(0, 255, 233,0)'
                                }],
                            global: false
                        }
                    },
                },
            },
            grid: {
                top: '3%',
                bottom: '20%',
                left: '1%',
                right: '1%',
            },
            xAxis: [{
                    type: this.data.xType,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: _colors__WEBPACK_IMPORTED_MODULE_1__["colors"]['color-gray-200'],
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        margin: 20,
                        color: _colors__WEBPACK_IMPORTED_MODULE_1__["colors"]['color-gray-200'],
                    },
                    splitLine: {
                        show: false
                    },
                    // boundaryGap: false,
                    axisTick: {
                        show: true,
                    },
                    data: [],
                }],
            yAxis: [{
                    type: this.data.yType,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: _colors__WEBPACK_IMPORTED_MODULE_1__["colors"]['color-gray-200'],
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        margin: 20,
                        textStyle: {
                            color: _colors__WEBPACK_IMPORTED_MODULE_1__["colors"]['color-gray-200'],
                        }
                    },
                    axisTick: {
                        show: true,
                    },
                }],
            series: [{
                    type: 'bar',
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 10,
                            color: _colors__WEBPACK_IMPORTED_MODULE_1__["colors"]['color-primary-400'],
                            shadowColor: _colors__WEBPACK_IMPORTED_MODULE_1__["colors"]['color-primary-transparent-700'],
                            shadowBlur: 20,
                            shadowOffsetY: 15
                        },
                        label: {
                            show: true,
                            position: 'right',
                            color: _colors__WEBPACK_IMPORTED_MODULE_1__["colors"]['color-gray-500'],
                        },
                    },
                    data: [],
                }],
        };
        this.barChartUpdates = {};
    }
    drawChart(data) {
        // 判斷是用x軸還是y軸當數值
        const value = data.xType === 'value' ? data.xAxis : data.yAxis;
        this.barChartUpdates.xAxis = [{
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: _colors__WEBPACK_IMPORTED_MODULE_1__["colors"]['color-gray-200'],
                    }
                },
                axisLabel: {
                    interval: 0,
                    margin: 20,
                    textStyle: {
                        color: _colors__WEBPACK_IMPORTED_MODULE_1__["colors"]['color-gray-200'],
                    },
                },
                splitLine: {
                    show: false
                },
                type: data.xType,
                data: data.xAxis,
            }];
        this.barChartUpdates.yAxis = [{
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: _colors__WEBPACK_IMPORTED_MODULE_1__["colors"]['color-gray-200'],
                    }
                },
                axisLabel: {
                    interval: 0,
                    margin: 20,
                    textStyle: {
                        color: _colors__WEBPACK_IMPORTED_MODULE_1__["colors"]['color-gray-200'],
                    },
                    formatter: (name) => {
                        if (name.length > 9) {
                            return name.substr(0, 9) + '...';
                        }
                        return name;
                    },
                },
                splitLine: {
                    show: false
                },
                type: data.yType,
                data: data.yAxis,
            }];
        this.barChartUpdates.series = [{
                data: value,
            }];
        this.barChartUpdates = Object.assign({}, this.barChartUpdates);
    }
    selectedChange() {
        let newData = {};
        if (this.selectedTime === '0') {
            newData = {
                xType: 'category',
                yType: 'value',
                xAxis: this.data.xAxis.slice(0, 6),
                yAxis: this.data.yAxis.slice(0, 6),
            };
        }
        else if (this.selectedTime === '1') {
            newData = {
                xType: 'category',
                yType: 'value',
                xAxis: this.data.xAxis.slice(6, 12),
                yAxis: this.data.yAxis.slice(6, 12),
            };
        }
        this.drawChart(newData);
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        if (changes.data && changes.data.currentValue) {
            this.data = changes.data.currentValue;
            this.drawChart(this.data);
        }
    }
}
BarChartComponent.ɵfac = function BarChartComponent_Factory(t) { return new (t || BarChartComponent)(); };
BarChartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: BarChartComponent, selectors: [["app-bar-chart"]], inputs: { data: "data" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 11, vars: 4, consts: [[1, "full-content"], [1, "container"], ["placeholder", "\u9078\u64C7\u6642\u9593", 1, "right", 3, "selected", "selectedChange"], ["value", "0"], ["value", "1"], ["echarts", "", 1, "full-content", 3, "options", "merge"]], template: function BarChartComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nb-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nb-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "nb-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedChange", function BarChartComponent_Template_nb_select_selectedChange_4_listener($event) { return ctx.selectedTime = $event; })("selectedChange", function BarChartComponent_Template_nb_select_selectedChange_4_listener() { return ctx.selectedChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "nb-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "\u4E0A\u534A\u5E74");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "nb-option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "\u4E0B\u534A\u5E74");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "nb-card-body");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.data.year, "\u5E74 \u9577\u689D\u5716 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("selected", ctx.selectedTime);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("options", ctx.barChartOption)("merge", ctx.barChartUpdates);
    } }, directives: [_nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbCardComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbCardHeaderComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbSelectComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbOptionComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbCardBodyComponent"], ngx_echarts__WEBPACK_IMPORTED_MODULE_3__["NgxEchartsDirective"]], styles: [".full-content[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100% !important;\n  margin: 0;\n  padding: 0;\n}\n\n.container[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.right[_ngcontent-%COMP%] {\n  position: absolute;\n  right: -1rem;\n  top: -2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxiYXItY2hhcnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUNGOztBQUNBO0VBQ0Usa0JBQUE7QUFFRjs7QUFBQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7QUFHRiIsImZpbGUiOiJiYXItY2hhcnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZnVsbC1jb250ZW50IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcclxuICBtYXJnaW46IDA7XHJcbiAgcGFkZGluZzogMDtcclxufVxyXG4uY29udGFpbmVyIHtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbn1cclxuLnJpZ2h0IHtcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgcmlnaHQ6IC0xcmVtO1xyXG4gIHRvcDogLTJyZW07XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BarChartComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-bar-chart',
                templateUrl: './bar-chart.component.html',
                styleUrls: ['./bar-chart.component.scss']
            }]
    }], function () { return []; }, { data: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "OzVJ":
/*!*********************************************!*\
  !*** ./src/app/shared-components/colors.ts ***!
  \*********************************************/
/*! exports provided: colors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colors", function() { return colors; });
const colors = {
    "color-primary-100": "#D4FCE1",
    "color-primary-200": "#AAFACB",
    "color-primary-300": "#7DF2B9",
    "color-primary-400": "#5BE6B0",
    "color-primary-500": "#2AD6A4",
    "color-primary-600": "#1EB89A",
    "color-primary-700": "#159A8D",
    "color-primary-800": "#0D7B7C",
    "color-primary-900": "#085D66",
    "color-primary-transparent-100": "rgba(42, 214, 164, 0.08)",
    "color-primary-transparent-200": "rgba(42, 214, 164, 0.16)",
    "color-primary-transparent-300": "rgba(42, 214, 164, 0.24)",
    "color-primary-transparent-400": "rgba(42, 214, 164, 0.32)",
    "color-primary-transparent-500": "rgba(42, 214, 164, 0.4)",
    "color-primary-transparent-600": "rgba(42, 214, 164, 0.48)",
    "color-primary-transparent-700": "rgba(42, 214, 164, 0.3)",
    "color-success-100": "#F2E3FE",
    "color-success-200": "#E4C7FE",
    "color-success-300": "#D2ABFD",
    "color-success-400": "#C295FB",
    "color-success-500": "#a973fa",
    "color-success-600": "#8354D7",
    "color-success-700": "#6039B3",
    "color-success-800": "#422490",
    "color-success-900": "#2D1677",
    "color-success-transparent-100": "rgba(169, 115, 250, 0.08)",
    "color-success-transparent-200": "rgba(169, 115, 250, 0.16)",
    "color-success-transparent-300": "rgba(169, 115, 250, 0.24)",
    "color-success-transparent-400": "rgba(169, 115, 250, 0.32)",
    "color-success-transparent-500": "rgba(169, 115, 250, 0.4)",
    "color-success-transparent-600": "rgba(169, 115, 250, 0.48)",
    "color-success-transparent-700": "rgba(169, 115, 250, 0.3)",
    "color-info-100": "#D6F6FE",
    "color-info-200": "#ADE8FE",
    "color-info-300": "#84D6FE",
    "color-info-400": "#65C3FD",
    "color-info-500": "#33a4fc",
    "color-info-600": "#2580D8",
    "color-info-700": "#195FB5",
    "color-info-800": "#104392",
    "color-info-900": "#092F78",
    "color-info-transparent-100": "rgba(51, 164, 252, 0.08)",
    "color-info-transparent-200": "rgba(51, 164, 252, 0.16)",
    "color-info-transparent-300": "rgba(51, 164, 252, 0.24)",
    "color-info-transparent-400": "rgba(51, 164, 252, 0.32)",
    "color-info-transparent-500": "rgba(51, 164, 252, 0.4)",
    "color-info-transparent-600": "rgba(51, 164, 252, 0.48)",
    "color-info-transparent-700": "rgba(51, 164, 252, 0.3)",
    "color-warning-100": "#FEF9CF",
    "color-warning-200": "#FEF29F",
    "color-warning-300": "#FEE96F",
    "color-warning-400": "#FDE04C",
    "color-warning-500": "#FCD111",
    "color-warning-600": "#D8AF0C",
    "color-warning-700": "#B58F08",
    "color-warning-800": "#927005",
    "color-warning-900": "#785A03",
    "color-warning-transparent-100": "rgba(252, 209, 17, 0.08)",
    "color-warning-transparent-200": "rgba(252, 209, 17, 0.16)",
    "color-warning-transparent-300": "rgba(252, 209, 17, 0.24)",
    "color-warning-transparent-400": "rgba(252, 209, 17, 0.32)",
    "color-warning-transparent-500": "rgba(252, 209, 17, 0.4)",
    "color-warning-transparent-600": "rgba(252, 209, 17, 0.48)",
    "color-warning-transparent-700": "rgba(252, 209, 17, 0.3)",
    "color-danger-100": "#FFEAD9",
    "color-danger-200": "#FFCFB3",
    "color-danger-300": "#FFAE8D",
    "color-danger-400": "#FF8F71",
    "color-danger-500": "#FF5B42",
    "color-danger-600": "#DB3930",
    "color-danger-700": "#B72125",
    "color-danger-800": "#931522",
    "color-danger-900": "#7A0C20",
    "color-danger-transparent-100": "rgba(255, 91, 66, 0.08)",
    "color-danger-transparent-200": "rgba(255, 91, 66, 0.16)",
    "color-danger-transparent-300": "rgba(255, 91, 66, 0.24)",
    "color-danger-transparent-400": "rgba(255, 91, 66, 0.32)",
    "color-danger-transparent-500": "rgba(255, 91, 66, 0.4)",
    "color-danger-transparent-600": "rgba(255, 91, 66, 0.48)",
    "color-danger-transparent-700": "rgba(255, 91, 66, 0.3)",
    'color-gray-100': '#F4F4F4',
    'color-gray-200': '#EAEAEA',
    'color-gray-300': '#C1C1C1',
    'color-gray-400': '#848484',
    'color-gray-500': '#333333',
    'color-gray-600': '#2B2525',
    'color-gray-700': '#24191B',
    'color-gray-800': '#1D1013',
    'color-gray-900': '#18090E',
};



/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nebular/theme */ "aceb");
/* harmony import */ var _pages_custom_custom_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/custom/custom.component */ "+XTi");




class AppComponent {
    constructor() {
        this.barChart = {
            xType: 'category',
            yType: 'value',
            xAxis: [9, 10, 8, 5, 6, 6],
            yAxis: [6, 7, 3, 9, 6, 4],
        };
        this.lineChart = {
            xAxis: Array.from([...Array(24).keys()]),
            lines: [
                { 'name': '使用率', 'values': [9, 10, 8, 5, 6, 6, 4, 9, 2, 3, 2, 3, 2, 3, 8, 9, 2, 3, 2, 3, 2, 3, 8, 14] }
            ],
        };
        this.pieChart = {
            legend: ['邪惡勢力', '還是邪惡勢力'],
            data: [333, 666]
        };
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 3, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nb-layout");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nb-layout-column");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-custom");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbLayoutComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_1__["NbLayoutColumnComponent"], _pages_custom_custom_component__WEBPACK_IMPORTED_MODULE_2__["CustomComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], null, null); })();


/***/ }),

/***/ "UgDJ":
/*!******************************************************************!*\
  !*** ./src/app/pages/custom/dynamic-component-host.directive.ts ***!
  \******************************************************************/
/*! exports provided: DynamicComponentHostDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicComponentHostDirective", function() { return DynamicComponentHostDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


class DynamicComponentHostDirective {
    constructor(_viewContainerRef) {
        this._viewContainerRef = _viewContainerRef;
        this.viewContainerRef = this._viewContainerRef;
    }
}
DynamicComponentHostDirective.ɵfac = function DynamicComponentHostDirective_Factory(t) { return new (t || DynamicComponentHostDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"])); };
DynamicComponentHostDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: DynamicComponentHostDirective, selectors: [["", "appDynamicComponentHost", ""]] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DynamicComponentHostDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[appDynamicComponentHost]',
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"] }]; }, null); })();


/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _nebular_nebular_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nebular/nebular.module */ "zPO6");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nebular/theme */ "aceb");
/* harmony import */ var ngx_echarts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-echarts */ "DKVz");
/* harmony import */ var _nebular_eva_icons__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @nebular/eva-icons */ "tR1z");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _shared_components_bar_chart_bar_chart_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./shared-components/bar-chart/bar-chart.component */ "LJHG");
/* harmony import */ var _shared_components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./shared-components/line-chart/line-chart.component */ "ra16");
/* harmony import */ var _shared_components_pie_chart_pie_chart_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./shared-components/pie-chart/pie-chart.component */ "Gl7V");
/* harmony import */ var _pages_custom_custom_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pages/custom/custom.component */ "+XTi");
/* harmony import */ var _shared_components_custom_add_button_add_button_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./shared-components/custom/add-button/add-button.component */ "dQQ/");
/* harmony import */ var _shared_components_custom_component_selector_component_selector_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./shared-components/custom/component-selector/component-selector.component */ "jM4B");
/* harmony import */ var _shared_components_custom_small_small_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./shared-components/custom/small/small.component */ "44pM");
/* harmony import */ var _pages_custom_dynamic_component_host_directive__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pages/custom/dynamic-component-host.directive */ "UgDJ");









// Componentes








// Directive




class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
            _nebular_theme__WEBPACK_IMPORTED_MODULE_6__["NbThemeModule"].forRoot({ name: 'dark' }),
            _nebular_theme__WEBPACK_IMPORTED_MODULE_6__["NbSidebarModule"].forRoot(),
            _nebular_nebular_module__WEBPACK_IMPORTED_MODULE_5__["NebularModule"],
            _nebular_eva_icons__WEBPACK_IMPORTED_MODULE_8__["NbEvaIconsModule"],
            ngx_echarts__WEBPACK_IMPORTED_MODULE_7__["NgxEchartsModule"].forRoot({
                echarts: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! echarts */ "MT78"))
            })
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"],
        _shared_components_bar_chart_bar_chart_component__WEBPACK_IMPORTED_MODULE_10__["BarChartComponent"],
        _shared_components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_11__["LineChartComponent"],
        _shared_components_pie_chart_pie_chart_component__WEBPACK_IMPORTED_MODULE_12__["PieChartComponent"],
        _pages_custom_custom_component__WEBPACK_IMPORTED_MODULE_13__["CustomComponent"],
        _shared_components_custom_add_button_add_button_component__WEBPACK_IMPORTED_MODULE_14__["AddButtonComponent"],
        _shared_components_custom_small_small_component__WEBPACK_IMPORTED_MODULE_16__["SmallComponent"],
        _shared_components_custom_component_selector_component_selector_component__WEBPACK_IMPORTED_MODULE_15__["ComponentSelectorComponent"],
        _pages_custom_dynamic_component_host_directive__WEBPACK_IMPORTED_MODULE_17__["DynamicComponentHostDirective"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_6__["NbThemeModule"], _nebular_theme__WEBPACK_IMPORTED_MODULE_6__["NbSidebarModule"], _nebular_nebular_module__WEBPACK_IMPORTED_MODULE_5__["NebularModule"],
        _nebular_eva_icons__WEBPACK_IMPORTED_MODULE_8__["NbEvaIconsModule"], ngx_echarts__WEBPACK_IMPORTED_MODULE_7__["NgxEchartsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"],
                    _shared_components_bar_chart_bar_chart_component__WEBPACK_IMPORTED_MODULE_10__["BarChartComponent"],
                    _shared_components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_11__["LineChartComponent"],
                    _shared_components_pie_chart_pie_chart_component__WEBPACK_IMPORTED_MODULE_12__["PieChartComponent"],
                    _pages_custom_custom_component__WEBPACK_IMPORTED_MODULE_13__["CustomComponent"],
                    _shared_components_custom_add_button_add_button_component__WEBPACK_IMPORTED_MODULE_14__["AddButtonComponent"],
                    _shared_components_custom_small_small_component__WEBPACK_IMPORTED_MODULE_16__["SmallComponent"],
                    _shared_components_custom_component_selector_component_selector_component__WEBPACK_IMPORTED_MODULE_15__["ComponentSelectorComponent"],
                    _pages_custom_dynamic_component_host_directive__WEBPACK_IMPORTED_MODULE_17__["DynamicComponentHostDirective"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_2__["BrowserAnimationsModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_3__["CommonModule"],
                    _nebular_theme__WEBPACK_IMPORTED_MODULE_6__["NbThemeModule"].forRoot({ name: 'dark' }),
                    _nebular_theme__WEBPACK_IMPORTED_MODULE_6__["NbSidebarModule"].forRoot(),
                    _nebular_nebular_module__WEBPACK_IMPORTED_MODULE_5__["NebularModule"],
                    _nebular_eva_icons__WEBPACK_IMPORTED_MODULE_8__["NbEvaIconsModule"],
                    ngx_echarts__WEBPACK_IMPORTED_MODULE_7__["NgxEchartsModule"].forRoot({
                        echarts: () => Promise.resolve(/*! import() */).then(__webpack_require__.bind(null, /*! echarts */ "MT78"))
                    })
                ],
                providers: [],
                entryComponents: [_shared_components_pie_chart_pie_chart_component__WEBPACK_IMPORTED_MODULE_12__["PieChartComponent"], _shared_components_bar_chart_bar_chart_component__WEBPACK_IMPORTED_MODULE_10__["BarChartComponent"], _shared_components_line_chart_line_chart_component__WEBPACK_IMPORTED_MODULE_11__["LineChartComponent"]],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "dQQ/":
/*!*****************************************************************************!*\
  !*** ./src/app/shared-components/custom/add-button/add-button.component.ts ***!
  \*****************************************************************************/
/*! exports provided: AddButtonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddButtonComponent", function() { return AddButtonComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nebular/theme */ "aceb");




function AddButtonComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AddButtonComponent_div_3_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1.choosedSize("big"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "\u5927");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AddButtonComponent_div_3_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r2); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.choosedSize("medium"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "\u4E2D");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class AddButtonComponent {
    constructor() {
        this.size = 'col-md-3';
        this.chooseSize = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    ngOnInit() {
    }
    choosedSize(size) {
        this.chooseSize.emit(size);
    }
    ngOnChanges(changes) {
        if (changes.haveOption && changes.haveOption.currentValue) {
            this.haveOption = changes.haveOption.currentValue;
            // this.index = changes.index.currentValue;
        }
    }
}
AddButtonComponent.ɵfac = function AddButtonComponent_Factory(t) { return new (t || AddButtonComponent)(); };
AddButtonComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AddButtonComponent, selectors: [["ngx-add-button"]], inputs: { size: "size", haveOption: "haveOption" }, outputs: { chooseSize: "chooseSize" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 4, vars: 2, consts: [[1, "wrapper", 3, "ngClass"], ["tabindex", "-1", 1, "block", "center"], ["icon", "plus-outline", 1, "font-size"], ["class", "multi-button", 4, "ngIf"], [1, "multi-button"], [3, "click"]], template: function AddButtonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "nb-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, AddButtonComponent_div_3_Template, 5, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", ctx.size);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.haveOption);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgClass"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbIconComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"]], styles: ["@keyframes shadowFadeIn {\n  0% {\n    box-shadow: inset 11px 11px 23px #0c0e1a, inset -11px -11px 23px #1e2646;\n  }\n  50% {\n    box-shadow: none;\n  }\n  100% {\n    box-shadow: 11px 11px 23px #0c0e1a, -11px -11px 23px #1e2646;\n  }\n}\n@keyframes shadowFadeOut {\n  0% {\n    box-shadow: 11px 11px 23px #0c0e1a, -11px -11px 23px #1e2646;\n  }\n  50% {\n    box-shadow: none;\n  }\n  100% {\n    box-shadow: inset 11px 11px 23px #0c0e1a, inset -11px -11px 23px #1e2646;\n  }\n}\n.center[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.block[_ngcontent-%COMP%] {\n  height: 100%;\n  box-shadow: inset 11px 11px 23px #0c0e1a, inset -11px -11px 23px #1e2646;\n  border-radius: 15px;\n  cursor: pointer;\n  transition: 0.3s all ease-in-out;\n  animation: shadowFadeOut 0.1s;\n}\n.block[_ngcontent-%COMP%]:hover {\n  color: #4ad0e1;\n  animation: shadowFadeIn 0.1s;\n  box-shadow: 11px 11px 23px #0c0e1a, -11px -11px 23px #1e2646;\n}\n.block[_ngcontent-%COMP%]:hover   .font-size[_ngcontent-%COMP%] {\n  font-size: 4em;\n}\n.block[_ngcontent-%COMP%]:focus   .multi-button[_ngcontent-%COMP%], .block[_ngcontent-%COMP%]   .multi-button[_ngcontent-%COMP%]:focus-within {\n  opacity: 1;\n  width: 10rem;\n  height: 10rem;\n}\n.wrapper[_ngcontent-%COMP%] {\n  height: 100%;\n  width: 100%;\n}\n.font-size[_ngcontent-%COMP%] {\n  transition: 0.3s all ease-in-out;\n  font-size: 2em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcYWRkLWJ1dHRvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQTtFQUNFO0lBQ0Usd0VBQUE7RUFMRjtFQU9BO0lBQ0UsZ0JBQUE7RUFMRjtFQU9BO0lBQ0UsNERBQUE7RUFMRjtBQUNGO0FBUUE7RUFDRTtJQUNFLDREQUFBO0VBTkY7RUFRQTtJQUNFLGdCQUFBO0VBTkY7RUFRQTtJQUNFLHdFQUFBO0VBTkY7QUFDRjtBQVNBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFQRjtBQVVBO0VBQ0UsWUFBQTtFQUNBLHdFQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0NBQUE7RUFDQSw2QkFBQTtBQVBGO0FBUUU7RUFDRSxjQUFBO0VBQ0EsNEJBQUE7RUFDQSw0REFBQTtBQU5KO0FBT0k7RUFDRSxjQUFBO0FBTE47QUFRRTs7RUFFRSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7QUFOSjtBQVNBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7QUFORjtBQVFBO0VBQ0UsZ0NBQUE7RUFDQSxjQUFBO0FBTEYiLCJmaWxlIjoiYWRkLWJ1dHRvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBpbXBvcnQgXCJ+QG5lYnVsYXIvdGhlbWUvc3R5bGVzL3RoZW1lc1wiO1xyXG5cclxuLy8gVmFyaWFibGVzXHJcbiRob3ZlckJnQ29sb3I6IHJnYmEoNzQsIDIwOCwgMjI1LCAwLjI0KTtcclxuJGhvdmVyQmdDb2xvcjI6IHJnYmEoNzQsIDIwOCwgMjI1LCAwLjQ4KTtcclxuXHJcbkBrZXlmcmFtZXMgc2hhZG93RmFkZUluIHtcclxuICAwJSB7XHJcbiAgICBib3gtc2hhZG93OiBpbnNldCAxMXB4IDExcHggMjNweCAjMGMwZTFhLCBpbnNldCAtMTFweCAtMTFweCAyM3B4ICMxZTI2NDY7XHJcbiAgfVxyXG4gIDUwJSB7XHJcbiAgICBib3gtc2hhZG93OiBub25lO1xyXG4gIH1cclxuICAxMDAlIHtcclxuICAgIGJveC1zaGFkb3c6IDExcHggMTFweCAyM3B4ICMwYzBlMWEsIC0xMXB4IC0xMXB4IDIzcHggIzFlMjY0NjtcclxuICB9XHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgc2hhZG93RmFkZU91dCB7XHJcbiAgMCUge1xyXG4gICAgYm94LXNoYWRvdzogMTFweCAxMXB4IDIzcHggIzBjMGUxYSwgLTExcHggLTExcHggMjNweCAjMWUyNjQ2O1xyXG4gIH1cclxuICA1MCUge1xyXG4gICAgYm94LXNoYWRvdzogbm9uZTtcclxuICB9XHJcbiAgMTAwJSB7XHJcbiAgICBib3gtc2hhZG93OiBpbnNldCAxMXB4IDExcHggMjNweCAjMGMwZTFhLCBpbnNldCAtMTFweCAtMTFweCAyM3B4ICMxZTI2NDY7XHJcbiAgfVxyXG59XHJcblxyXG4uY2VudGVyIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5ibG9jayB7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIGJveC1zaGFkb3c6IGluc2V0IDExcHggMTFweCAyM3B4ICMwYzBlMWEsIGluc2V0IC0xMXB4IC0xMXB4IDIzcHggIzFlMjY0NjtcclxuICBib3JkZXItcmFkaXVzOiAxNXB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICB0cmFuc2l0aW9uOiAwLjNzIGFsbCBlYXNlLWluLW91dDtcclxuICBhbmltYXRpb246IHNoYWRvd0ZhZGVPdXQgMC4xcztcclxuICAmOmhvdmVyIHtcclxuICAgIGNvbG9yOiByZ2JhKDc0LCAyMDgsIDIyNSwgMSk7XHJcbiAgICBhbmltYXRpb246IHNoYWRvd0ZhZGVJbiAwLjFzO1xyXG4gICAgYm94LXNoYWRvdzogMTFweCAxMXB4IDIzcHggIzBjMGUxYSwgLTExcHggLTExcHggMjNweCAjMWUyNjQ2O1xyXG4gICAgLmZvbnQtc2l6ZSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogNGVtO1xyXG4gICAgfVxyXG4gIH1cclxuICAmOmZvY3VzIC5tdWx0aS1idXR0b24sXHJcbiAgLm11bHRpLWJ1dHRvbjpmb2N1cy13aXRoaW4ge1xyXG4gICAgb3BhY2l0eTogMTtcclxuICAgIHdpZHRoOiAxMHJlbTtcclxuICAgIGhlaWdodDogMTByZW07XHJcbiAgfVxyXG59XHJcbi53cmFwcGVyIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuLmZvbnQtc2l6ZSB7XHJcbiAgdHJhbnNpdGlvbjogMC4zcyBhbGwgZWFzZS1pbi1vdXQ7XHJcbiAgZm9udC1zaXplOiAyZW07XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AddButtonComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'ngx-add-button',
                templateUrl: './add-button.component.html',
                styleUrls: ['./add-button.component.scss']
            }]
    }], function () { return []; }, { size: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], haveOption: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], chooseSize: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "jM4B":
/*!*********************************************************************************************!*\
  !*** ./src/app/shared-components/custom/component-selector/component-selector.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: ComponentSelectorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComponentSelectorComponent", function() { return ComponentSelectorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_services_utils_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/utils.service */ "0ygI");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nebular/theme */ "aceb");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");





function ComponentSelectorComponent_nb_card_6_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nb-card", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nb-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nb-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ComponentSelectorComponent_nb_card_6_Template_nb_icon_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const item_r2 = ctx.$implicit; const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r3.chooseComponent(item_r2); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "nb-card-body", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", item_r2.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r2.description, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", item_r2.img, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function ComponentSelectorComponent_nb_card_9_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nb-card", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nb-card-header");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nb-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ComponentSelectorComponent_nb_card_9_Template_nb_icon_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r7); const item_r5 = ctx.$implicit; const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r6.chooseComponent(item_r5); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "nb-card-body", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "img", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", item_r5.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", item_r5.description, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", item_r5.img, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
const _c0 = ["*"];
class ComponentSelectorComponent {
    constructor(utilsService) {
        this.utilsService = utilsService;
        this.choosed = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.page1Source = this.utilsService.Page1Components;
        this.page2Source = this.utilsService.Page2Components;
        this.page1Components = this.utilsService.Page1Components;
        this.page2Components = this.utilsService.Page2Components;
    }
    chooseComponent(name) {
        this.choosed.emit(name);
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        console.log(changes);
        // if (changes.sizeFilter && changes.sizeFilter.currentValue) {
        //   this.sizeFilter = changes.sizeFilter.currentValue;
        //   console.log(this.sizeFilter);
        //   this.page1Components = this.page1Source.filter(e => e.size === this.sizeFilter);
        //   this.page2Components = this.page2Source.filter(e => e.size === this.sizeFilter);
        // }
    }
}
ComponentSelectorComponent.ɵfac = function ComponentSelectorComponent_Factory(t) { return new (t || ComponentSelectorComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_utils_service__WEBPACK_IMPORTED_MODULE_1__["UtilsService"])); };
ComponentSelectorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ComponentSelectorComponent, selectors: [["app-component-selector"]], inputs: { sizeFilter: "sizeFilter" }, outputs: { choosed: "choosed" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], ngContentSelectors: _c0, decls: 10, vars: 2, consts: [[1, "card-list"], [1, "hide-scrollbar"], ["fullWidth", ""], ["tabTitle", "\u7B2C\u4E00\u9801\u7684\u6A21\u7D44"], [1, "row", "justify-content-center"], ["class", "col-md-12 my-4", 4, "ngFor", "ngForOf"], ["tabTitle", "\u7B2C\u4E8C\u9801\u7684\u6A21\u7D44"], [1, "col-md-12", "my-4"], ["icon", "plus-outline", 1, "right", 3, "click"], [1, "card-content"], ["alt", "", 1, "preview", 3, "src"]], template: function ComponentSelectorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nb-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nb-card-body", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "nb-tabset", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "nb-tab", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ComponentSelectorComponent_nb_card_6_Template, 7, 3, "nb-card", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "nb-tab", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, ComponentSelectorComponent_nb_card_9_Template, 7, 3, "nb-card", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.page1Components);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.page2Components);
    } }, directives: [_nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbCardComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbCardBodyComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbTabsetComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbTabComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbCardHeaderComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_2__["NbIconComponent"]], styles: [".right[_ngcontent-%COMP%] {\n  position: absolute !important;\n  right: 0;\n  top: 0;\n  margin: 15px;\n  transition: 0.3s all ease-in-out;\n}\n.right[_ngcontent-%COMP%]:hover {\n  color: #4ad0e1;\n  font-size: 1.5rem;\n  scale: 1.4;\n}\n.preview[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 1rem;\n}\n.card-content[_ngcontent-%COMP%] {\n  height: 300px;\n}\n.card-list[_ngcontent-%COMP%] {\n  height: 100vh;\n}\n\n.hide-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none;\n}\n\n.hide-scrollbar[_ngcontent-%COMP%] {\n  -ms-overflow-style: none;\n  \n  scrollbar-width: none;\n  \n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFwuLlxcY29tcG9uZW50LXNlbGVjdG9yLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsNkJBQUE7RUFDQSxRQUFBO0VBQ0EsTUFBQTtFQUNBLFlBQUE7RUFDQSxnQ0FBQTtBQUNGO0FBQUU7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxVQUFBO0FBRUo7QUFDQTtFQUNFLFdBQUE7RUFDQSxhQUFBO0FBRUY7QUFBQTtFQUNFLGFBQUE7QUFHRjtBQURBO0VBQ0UsYUFBQTtBQUlGO0FBRkEsZ0RBQUE7QUFDQTtFQUNFLGFBQUE7QUFLRjtBQUhBLDRDQUFBO0FBQ0E7RUFDRSx3QkFBQTtFQUEwQixnQkFBQTtFQUMxQixxQkFBQTtFQUF1QixZQUFBO0FBUXpCIiwiZmlsZSI6ImNvbXBvbmVudC1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yaWdodCB7XHJcbiAgcG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7XHJcbiAgcmlnaHQ6IDA7XHJcbiAgdG9wOiAwO1xyXG4gIG1hcmdpbjogMTVweDtcclxuICB0cmFuc2l0aW9uOiAwLjNzIGFsbCBlYXNlLWluLW91dDtcclxuICAmOmhvdmVyIHtcclxuICAgIGNvbG9yOiByZ2JhKDc0LCAyMDgsIDIyNSwgMSk7XHJcbiAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgIHNjYWxlOiAxLjQ7XHJcbiAgfVxyXG59XHJcbi5wcmV2aWV3IHtcclxuICB3aWR0aDogMTAwJTtcclxuICBwYWRkaW5nOiAxcmVtO1xyXG59XHJcbi5jYXJkLWNvbnRlbnQge1xyXG4gIGhlaWdodDogMzAwcHg7XHJcbn1cclxuLmNhcmQtbGlzdCB7XHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxufVxyXG4vKiBIaWRlIHNjcm9sbGJhciBmb3IgQ2hyb21lLCBTYWZhcmkgYW5kIE9wZXJhICovXHJcbi5oaWRlLXNjcm9sbGJhcjo6LXdlYmtpdC1zY3JvbGxiYXIge1xyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbn1cclxuLyogSGlkZSBzY3JvbGxiYXIgZm9yIElFLCBFZGdlIGFuZCBGaXJlZm94ICovXHJcbi5oaWRlLXNjcm9sbGJhciB7XHJcbiAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lOyAvKiBJRSBhbmQgRWRnZSAqL1xyXG4gIHNjcm9sbGJhci13aWR0aDogbm9uZTsgLyogRmlyZWZveCAqL1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ComponentSelectorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-component-selector',
                templateUrl: './component-selector.component.html',
                styleUrls: ['./component-selector.component.scss']
            }]
    }], function () { return [{ type: src_app_services_utils_service__WEBPACK_IMPORTED_MODULE_1__["UtilsService"] }]; }, { sizeFilter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], choosed: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "oOhd":
/*!********************************************!*\
  !*** ./src/app/services/custom.service.ts ***!
  \********************************************/
/*! exports provided: CustomService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomService", function() { return CustomService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _utils_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.service */ "0ygI");




class CustomService {
    constructor(utilsService) {
        this.utilsService = utilsService;
        this.wrapperRefs = Array();
        this.chartRefs = Array();
        // 記錄頁面元件數量狀態
        this.componentsArray = [];
    }
    pushWrapperRefs(componentRef) {
        this.wrapperRefs.push(componentRef);
    }
    pushChartRefs(componentRef) {
        this.chartRefs.push(componentRef);
    }
    pushComponent(component) {
        this.componentsArray.push(component);
    }
    getWrapperRefs() {
        return this.wrapperRefs;
    }
    refreshRemoveMode(removeable) {
        this.wrapperRefs.forEach(c => {
            c.instance.removable = removeable;
        });
    }
    removeComponent(uniqueKey) {
        // 移除外層容器
        const idx = this.wrapperRefs.findIndex(e => e.instance.uniqueKey === uniqueKey);
        this.wrapperRefs[idx].destroy();
        this.wrapperRefs = this.wrapperRefs.filter(e => e.instance.uniqueKey !== uniqueKey);
        // 移除內部元件
        this.componentsArray.splice(idx, 1);
    }
    getComponentsArray() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.componentsArray.length === 0) {
                // 可以設定成從後端撈取設定值
                const arr = [];
                return arr;
            }
            else {
                return this.componentsArray;
            }
        });
    }
    updateInputData(component, targetRef, year) {
        // 產生 InputData
        const inputData = this.utilsService.getData(component.name, year);
        // 傳入到 Input 中，會觸發在 ngOnInit
        targetRef.instance['data'] = inputData;
        // 產生 change
        const changes = {
            data: new _angular_core__WEBPACK_IMPORTED_MODULE_1__["SimpleChange"](undefined, inputData, false)
        };
        // 傳入到 Onchange
        if (typeof targetRef.instance.ngOnChanges !== 'undefined') {
            targetRef.instance.ngOnChanges(changes);
        }
    }
}
CustomService.ɵfac = function CustomService_Factory(t) { return new (t || CustomService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"])); };
CustomService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CustomService, factory: CustomService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CustomService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _utils_service__WEBPACK_IMPORTED_MODULE_2__["UtilsService"] }]; }, null); })();


/***/ }),

/***/ "ra16":
/*!**********************************************************************!*\
  !*** ./src/app/shared-components/line-chart/line-chart.component.ts ***!
  \**********************************************************************/
/*! exports provided: LineChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineChartComponent", function() { return LineChartComponent; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../colors */ "OzVJ");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var echarts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! echarts */ "MT78");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nebular/theme */ "aceb");
/* harmony import */ var ngx_echarts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-echarts */ "DKVz");






class LineChartComponent {
    constructor() {
        this.data = {
            year: 2018,
            xAxis: [],
            lines: [],
        };
        this.lineChartOption = {
            legend: {
                textStyle: {
                    color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-200'],
                    fontSize: 14
                },
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                    offset: 0,
                                    color: 'rgba(0, 255, 233,0)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(255, 255, 255,1)',
                                }, {
                                    offset: 1,
                                    color: 'rgba(0, 255, 233,0)'
                                }],
                            global: false
                        }
                    },
                },
            },
            grid: {
                top: '3%',
                bottom: '20%',
                left: '3%',
                right: '3%',
            },
            xAxis: [{
                    type: 'category',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-200'],
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        margin: 20,
                        color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-200'],
                    },
                    splitLine: {
                        show: false
                    },
                    boundaryGap: false,
                    axisTick: {
                        show: true,
                    },
                    data: [],
                }],
            yAxis: [{
                    type: 'value',
                    min: 0,
                    splitNumber: 4,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-200'],
                        }
                    },
                    axisLabel: {
                        margin: 20,
                        textStyle: {
                            color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-200'],
                        },
                    },
                    axisTick: {
                        show: true,
                    },
                }],
            series: []
        };
        this.lineChartUpdates = {};
    }
    drawChart(data) {
        const colorNames = ['primary', 'info', 'danger', 'success', 'warning', 'gray'];
        const series = [];
        data.lines.forEach((line, index) => {
            series.push({
                name: line.name,
                type: 'line',
                showAllSymbol: true,
                symbol: 'circle',
                smooth: false,
                showSymbol: true,
                symbolSize: 5,
                lineStyle: {
                    normal: {
                        width: 5,
                        color: new echarts__WEBPACK_IMPORTED_MODULE_2__["graphic"].LinearGradient(0, 1, 0, 0, [{
                                offset: 0,
                                color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"][`color-${colorNames[index % colorNames.length]}-500`]
                            }, {
                                offset: 1,
                                color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"][`color-${colorNames[index % colorNames.length]}-300`]
                            }]),
                        shadowColor: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"][`color-${colorNames[index % colorNames.length]}-transparent-700`],
                        shadowBlur: 20,
                        shadowOffsetY: 15
                    },
                },
                itemStyle: {
                    color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"][`color-${colorNames[index % colorNames.length]}-500`],
                    borderColor: '#fff',
                    borderWidth: 2,
                    shadowColor: 'rgba(0, 0, 0, .1)',
                    shadowBlur: 0,
                    shadowOffsetY: 2,
                    shadowOffsetX: 2,
                },
                tooltip: {
                    show: true
                },
                data: line.values
            });
        });
        this.lineChartOption = {
            legend: {
                textStyle: {
                    color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-200'],
                    fontSize: 14
                },
                show: data.lines.length > 1 ? true : false,
                data: data.lines.map(l => l.name)
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                    offset: 0,
                                    color: 'rgba(0, 255, 233,0)'
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(255, 255, 255,1)',
                                }, {
                                    offset: 1,
                                    color: 'rgba(0, 255, 233,0)'
                                }],
                            global: false
                        }
                    },
                },
            },
            grid: {
                top: '3%',
                bottom: '20%',
                left: '3%',
                right: '3%',
            },
            xAxis: [{
                    type: 'category',
                    data: data.xAxis,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-200'],
                        }
                    },
                    splitArea: {
                        show: false
                    },
                    axisLabel: {
                        margin: 20,
                        color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-200'],
                    },
                    splitLine: {
                        show: false
                    },
                    boundaryGap: false,
                    axisTick: {
                        show: true,
                    }
                }],
            yAxis: [{
                    type: 'value',
                    min: 0,
                    splitNumber: 4,
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-200'],
                        }
                    },
                    axisLabel: {
                        margin: 20,
                        textStyle: {
                            color: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]['color-gray-200'],
                        },
                    },
                    axisTick: {
                        show: true,
                    },
                }],
            series: series
        };
    }
    selectedChange() {
        let newData = {};
        if (this.selectedTime === '0') {
            newData = {
                xAxis: this.data.xAxis.slice(0, 6),
                lines: [
                    { 'name': '使用率', 'values': this.data.lines[0].values.slice(0, 6) }
                ],
            };
        }
        else if (this.selectedTime === '1') {
            newData = {
                xAxis: this.data.xAxis.slice(6, 12),
                lines: [
                    { 'name': '使用率', 'values': this.data.lines[0].values.slice(6, 12) }
                ],
            };
        }
        this.drawChart(newData);
        console.log(this.data);
    }
    ngOnInit() {
    }
    ngOnChanges(changes) {
        if (changes.data && changes.data.currentValue) {
            this.data = changes.data.currentValue;
            this.drawChart(this.data);
        }
    }
}
LineChartComponent.ɵfac = function LineChartComponent_Factory(t) { return new (t || LineChartComponent)(); };
LineChartComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: LineChartComponent, selectors: [["app-line-chart"]], inputs: { data: "data" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]], decls: 11, vars: 4, consts: [[1, "full-content"], [1, "container"], ["placeholder", "\u9078\u64C7\u6642\u9593", 1, "right", 3, "selected", "selectedChange"], ["value", "0"], ["value", "1"], ["echarts", "", 1, "full-content", 3, "options", "merge"]], template: function LineChartComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "nb-card", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "nb-card-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "nb-select", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectedChange", function LineChartComponent_Template_nb_select_selectedChange_4_listener($event) { return ctx.selectedTime = $event; })("selectedChange", function LineChartComponent_Template_nb_select_selectedChange_4_listener() { return ctx.selectedChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "nb-option", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "\u4E0A\u534A\u5E74");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "nb-option", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "\u4E0B\u534A\u5E74");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "nb-card-body");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.data.year, "\u5E74 \u6298\u7DDA\u5716 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("selected", ctx.selectedTime);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("options", ctx.lineChartOption)("merge", ctx.lineChartUpdates);
    } }, directives: [_nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCardComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCardHeaderComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSelectComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbOptionComponent"], _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCardBodyComponent"], ngx_echarts__WEBPACK_IMPORTED_MODULE_4__["NgxEchartsDirective"]], styles: [".full-content[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n}\n\n.container[_ngcontent-%COMP%] {\n  position: relative;\n}\n\n.right[_ngcontent-%COMP%] {\n  position: absolute;\n  right: -1rem;\n  top: -2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxsaW5lLWNoYXJ0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBQUNGOztBQUNBO0VBQ0Usa0JBQUE7QUFFRjs7QUFBQTtFQUNFLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7QUFHRiIsImZpbGUiOiJsaW5lLWNoYXJ0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmZ1bGwtY29udGVudCB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxMDAlO1xyXG4gIG1hcmdpbjogMDtcclxuICBwYWRkaW5nOiAwO1xyXG59XHJcbi5jb250YWluZXIge1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxufVxyXG4ucmlnaHQge1xyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICByaWdodDogLTFyZW07XHJcbiAgdG9wOiAtMnJlbTtcclxufVxyXG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](LineChartComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-line-chart',
                templateUrl: './line-chart.component.html',
                styleUrls: ['./line-chart.component.scss']
            }]
    }], function () { return []; }, { data: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }] }); })();


/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");




const routes = [];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "zPO6":
/*!*******************************************!*\
  !*** ./src/app/nebular/nebular.module.ts ***!
  \*******************************************/
/*! exports provided: NebularModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NebularModule", function() { return NebularModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var ngx_echarts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-echarts */ "DKVz");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nebular/theme */ "aceb");





const modules = [
    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
    ngx_echarts__WEBPACK_IMPORTED_MODULE_2__["NgxEchartsModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbStepperModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCalendarModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbButtonModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCardModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbListModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbDatepickerModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbInputModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSelectModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbAccordionModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCheckboxModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbTabsetModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbTreeGridModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSpinnerModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbTooltipModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbMenuModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbIconModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSidebarModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbLayoutModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbToggleModule"],
    _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbToastrModule"],
];
class NebularModule {
}
NebularModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: NebularModule });
NebularModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function NebularModule_Factory(t) { return new (t || NebularModule)(); }, imports: [modules, _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        ngx_echarts__WEBPACK_IMPORTED_MODULE_2__["NgxEchartsModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbStepperModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCalendarModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbButtonModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCardModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbListModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbDatepickerModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbInputModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSelectModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbAccordionModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCheckboxModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbTabsetModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbTreeGridModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSpinnerModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbTooltipModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbMenuModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbIconModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSidebarModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbLayoutModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbToggleModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbToastrModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](NebularModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        ngx_echarts__WEBPACK_IMPORTED_MODULE_2__["NgxEchartsModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbStepperModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCalendarModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbButtonModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCardModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbListModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbDatepickerModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbInputModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSelectModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbAccordionModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCheckboxModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbTabsetModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbTreeGridModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSpinnerModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbTooltipModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbMenuModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbIconModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSidebarModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbLayoutModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbToggleModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbToastrModule"]], exports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        ngx_echarts__WEBPACK_IMPORTED_MODULE_2__["NgxEchartsModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbStepperModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCalendarModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbButtonModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCardModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbListModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbDatepickerModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbInputModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSelectModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbAccordionModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbCheckboxModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbTabsetModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbTreeGridModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSpinnerModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbTooltipModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbMenuModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbIconModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbSidebarModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbLayoutModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbToggleModule"],
        _nebular_theme__WEBPACK_IMPORTED_MODULE_3__["NbToastrModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NebularModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [],
                imports: modules,
                exports: modules,
            }]
    }], null, null); })();


/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ "AytR");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map