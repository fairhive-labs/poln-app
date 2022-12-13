import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  media: SocialMedia[] = [
    // {
    //   name: 'Twitter',
    //   link: 'https://twitter.com/fairhive'
    // },
    // {
    //   name: 'Discord',
    //   link: 'https://discord.com/invite/a3QxGfvsS7'
    // },
    // {
    //   name: 'Telegram',
    //   link: 'https://t.me/fairhive'
    // },
    // {
    //   name: 'Medium',
    //   link: 'https://medium.com/fairhive'
    // },
    {
      name: 'Email',
      link: 'mailto:contact@fairhive-labs.com?subject=Hello fairhive'
    },
    {
      name: 'GitHub',
      link: 'https://github.com/fairhive-labs'
    },
    // {
    //   name: 'Instagram',
    //   link: 'https://www.instagram.com/fairhive/'
    // },
    // {
    //   name: 'LinkedIn',
    //   link: 'https://www.linkedin.com/company/fairhive'
    // },
    // {
    //   name: 'Facebook',
    //   link: 'https://www.facebook.com/fairhive/'
    // }
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
