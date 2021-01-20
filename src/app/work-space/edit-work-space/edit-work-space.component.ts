import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { EditWorkSpaceService } from './edit-work-space.service';

@Component({
  selector: 'app-edit-work-space',
  templateUrl: './edit-work-space.component.html',
  styleUrls: ['./edit-work-space.component.css']
})
export class EditWorkSpaceComponent implements OnInit {
  pocId:any;
  formGroup: FormGroup;
  workspaceBoardsData = [];
  pocBoardsList=[];
  submitted: boolean = false;
  currentDate = new Date();
  constructor(private actRoute: ActivatedRoute,private formBuilder: FormBuilder,private Service:EditWorkSpaceService) { }

  ngOnInit(): void {
    this.getParam();
    this.initForm(); 
    this.getWorkSpaceBoards(localStorage.getItem('tempCurrentUserToken'));
  }
  initForm()
  {    
    this.formGroup = this.formBuilder.group({
      pocName: ['', Validators.required],
      pocDesc: ['', Validators.required],
      initialRequirement:['IR_V1'],
      processFlow:['PF_V1'],
      applicationFlow:['AF_V1'],
      wireframe:['W_V1'],
      prototype:['P_V1'],
      pocreview:['PR_V1'],
      developmentDocuments:['DD_V1'],
      publishpoc:['PP_V1']
    });
  }
  getWorkSpaceBoards(token: any) {
    const header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    };
    
      this.Service.getWorkSpaceboards(header)
        .pipe(first())
        .subscribe(
          (data: any) => {
            this.workspaceBoardsData = data.result_data;
            //console.log(this.workspaceBoardsData,this.getWorkSpaceBoardAvailablity('Process Flow'),">>>>>>>>>this.workspaceBoardsData")
            
          },
          error => {
          });
  }
  get f1() { return this.formGroup.controls; }
  getParam()
  {
    this.pocId = this.actRoute.snapshot.params.subNav
  }
  getWorkSpaceBoardAvailablity(boardName)
  {
  if (this.getWorkSpaceBoardExists(boardName))
  {
    /*
    if (boardName == 'Initial Requirement')
    {
      this.formGroup.get("initialRequirement").setValidators(Validators.required);
    }
    if (boardName == 'Process Flow')
    {
      this.formGroup.get("processFlow").setValidators(Validators.required);
    }
    if (boardName == 'Application Flow')
    {
      this.formGroup.get("applicationFlow").setValidators(Validators.required);
    }
    if (boardName == 'Wireframe')
    {
      this.formGroup.get("wireframe").setValidators(Validators.required);
    }
    if (boardName == 'Prototype')
    {
      this.formGroup.get("prototype").setValidators(Validators.required);
    }
    if (boardName == 'POC Review')
    {
      this.formGroup.get("pocreview").setValidators(Validators.required);
    }
    if (boardName == 'Development Documents')
    {
      this.formGroup.get("developmentDocuments").setValidators(Validators.required);
    }
    if (boardName == 'Publish POC')
    {
      this.formGroup.get("publishpoc").setValidators(Validators.required);
    }*/
  }
  return this.getWorkSpaceBoardExists(boardName);
  }
  getWorkSpaceBoardExists(boardName) {
    return this.workspaceBoardsData.some(function(el) {
      return el.boardName == boardName;
    }); 
  }
  getWorkSpaceBoardObj(boardName,desc) {
    const outputObj ={};
    this.workspaceBoardsData.some(function(el) {
      if (el.boardName == boardName)
      {
        outputObj["boardId"]=el.id;
        outputObj["customBoardName"]=boardName;
        outputObj["description"]=desc;
      }
    }); 
    return outputObj;
  }
}
