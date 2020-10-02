import { Component } from '@angular/core';

import { VOTE_OPTIONS, VoteOption } from './../shared/vote-option';

@Component({
  selector: 'app-know-how',
  templateUrl: './know-how.component.html',
  styleUrls: ['./know-how.component.scss']
})
export class KnowHowComponent {
  voteOptions: VoteOption[] = VOTE_OPTIONS;
}
