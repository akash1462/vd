import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SkillService } from '../skill.service';
import { Mentor } from '../Mentor';


@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.css']
})
export class MentorDetailsComponent implements OnInit {

  constructor(private fb:FormBuilder,private router:Router,private skillService:SkillService) { }
  signupForm:FormGroup;


  ngOnInit() {this.signupForm=this.fb.group({
    linkedinURL:["",[Validators.required]],
    yearsOfExperience:["",[Validators.required]],
    timeslot:["",[Validators.required]]
    
  });
}
get linkedinURL() {
  return this.signupForm.get('linkedinURL');
}
get yearsOfExperience() {
  return this.signupForm.get('yearsOfExperience');
}
get timeslot() {
  return this.signupForm.get('timeslot');
}

addMentor(MentorForm:any){
  this.skillService.mentor.linkedinURL=MentorForm['linkedinURL'];
  this.skillService.mentor.timeslot=MentorForm['timeslot'];
  this.skillService.mentor.yearsOfExperience=MentorForm['yearsOfExperience'];
  this.skillService.addNewMentor(this.skillService.mentor).subscribe(data=>{
    alert("Click okay to add Skills");
    this.router.navigate(['addSkill'])
  })

}



}
