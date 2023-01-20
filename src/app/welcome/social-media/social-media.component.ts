import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  media: SocialMedia[] = [
        {
      name: 'email',
      link: 'mailto:contact@fairhive-labs.com?subject=Hello fairhive'
    },
    {
      name: 'github',
      link: 'https://github.com/fairhive-labs'
    },{
      name:'slack (exp. Feb 19, 2023)',
      link: 'https://join.slack.com/t/fairhive-labs/shared_invite/zt-1nphgbo6c-pvpLmCTXS9QqDiL5yTcbSA'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.media = this.media.sort((s1, s2) => s1.name.localeCompare(s2.name));
  }

}

interface SocialMedia {
  name: string,
  link: string,
}
