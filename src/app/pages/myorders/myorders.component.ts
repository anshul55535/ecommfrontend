import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent implements OnInit{

  myorders:any =''

  constructor(private us: UserService, private route: ActivatedRoute) {

  }


  ngOnInit(): void {

    this.us.getorders().subscribe((data)=>{
      this.myorders = data
    })
  }

}
