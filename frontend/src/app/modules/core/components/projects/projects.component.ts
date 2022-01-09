import { Component, OnInit } from '@angular/core';

interface Project {
  title: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})


export class ProjectsComponent implements OnInit {

  projects: Project[] = [
    { 
      title: 'Project 1', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
      tags: ['Tech 1', 'Tech 2', 'Tech 3', 'Tech 4']
    },
    { 
      title: 'Project 2', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
      tags: ['Tech 1', 'Tech 2', 'Tech 3']
    },
    { 
      title: 'Project 3', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
      tags: ['Tech 1', 'Tech 2']
    },
    { 
      title: 'Project 4', 
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
      tags: ['Tech 1', 'Tech 2']
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}