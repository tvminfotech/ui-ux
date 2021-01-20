import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {
  constructor() { }
  getPOCId() 
  {
    var wsPocId =localStorage.getItem('wsPocId');
    return wsPocId;
  }
  setPOCId(wsPocId) 
  {
    localStorage.setItem('wsPocId',wsPocId);
  }
  getWSSubMenu() 
  {
    var WSSubMenu =localStorage.getItem('SubMenuVar');
    return WSSubMenu;
  }
  setWSSubMenu(WSSubMenu) 
  {
    localStorage.setItem('SubMenuVar',WSSubMenu);
  }
}
