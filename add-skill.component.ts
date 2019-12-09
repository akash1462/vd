import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { SkillService } from '../skill.service';
import { Skill } from '../Skill';
import { Mentor_Skill } from '../Mentor_skill';


@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent implements OnInit {

  constructor(private fb:FormBuilder,private router:Router,private skillService:SkillService) { }
  signupForm:FormGroup;
  skillList:Skill[] = [];

  ngOnInit() {
    this.buildsignupForm()
    this.skillList=[];
    this.skillService.getAllSkills().subscribe(data=>{
      this.skillList=data;
    })
  }

  buildsignupForm(){
    this.signupForm = this.fb.group({
      skill:['',[
        Validators.required
      ]],
      selfRating:['',[
        Validators.required,
        Validators.max(10)]],
        yearsOfExperience: ['', [
        Validators.required]],
    })
  }
  get skill() {
    return this.signupForm.get('skill');
  }
  get selfRating() {
    return this.signupForm.get('selfRating');
  }
  get yearsOfExperience() {
    return this.signupForm.get('yearsOfExperience');
  }

  addSkill(skillForm:any){
    let mentorSkill:Mentor_Skill={mentor:this.skillService.mentor,selfRating:skillForm['selfRating'],yearsOfExperience:skillForm['yearsOfExperience'],
                                    skill:this.skillList.find(skill=>skill.name == skillForm["skill"])}
    this.skillService.addNewMentorSkill(mentorSkill).subscribe(data=>{
      this.buildsignupForm();
    })

  }

}
