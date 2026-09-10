// Public editorial data. Language-specific vector artwork, not original project evidence.
const artwork=(file,title,caption,look,action,kind)=>{const boardKey=file.replace(/\.(webp|svg)$/,'').replace(/-concept$/,'');return {file:boardKey+'-en.svg',boardKey,title,kind,caption,look,action,origin:'localized'};};
const concept=(...args)=>artwork(...args,'Case illustration · English board');
const board=(...args)=>artwork(...args,'Method board · Example content');

export default {
  steve:{
    title:'Before classifying a new keyword as negative, check whether its protection rule is active.',
    intro:'A technical handover needs to explain what is implemented, which settings do not participate in execution, and what still requires a business decision.',
    cover:'steve-en.svg',
    images:[concept('steve-concept.webp','The exploration-period safeguard is in the settings, but the decision logic never reads it.',
      'A working board reconstructed from this case’s verification method. Rules A and B are anonymous examples.',
      'Follow two paths through “Documentation and settings → Actual reads → Decision logic”: one takes effect, while the other stops at a declaration. The handover records facts and open questions; it does not establish that repairs are complete.',
      'Steve starts from documented claims, traces definitions, reads, parameter passing and use, then records discrepancies in a handover checklist that others can verify. This does not make Steve the original tool’s developer.')],
    extension:{title:'Three kinds of handover questions need different owners.',steps:[
      ['Implementation facts','Code can show how the tool currently runs. Attach locations to findings so the next owner can check them.'],
      ['Capabilities not connected','Record a name’s presence, a setting’s existence and actual execution separately. Locate the missing connection before deciding on a repair.'],
      ['Business choices','The owner confirms default benchmarks and business definitions. Technical verification supplies facts without independently changing business rules.']
    ]}
  },
  oliva:{
    title:'Customer support receives more than a paragraph of text.',
    intro:'What the customer has already said, a suggested reply, its sources and what still needs checking all enter the support worksheet. Human-approved corrections then help with the next answer.',
    cover:'oliva-en.svg',
    images:[
      concept('oliva-concept.webp','Customer question → Suggested reply → Human correction → Knowledge update.',
        'An anonymous example of a support collaboration worksheet, not an original customer conversation.',
        'Model and order information already provided stays on the left. The middle contains a suggested reply for support staff to review. The right identifies source material and live order details still awaiting confirmation.',
        'Oliva helps support staff find information and compose replies, avoiding repeated requests for information and unsupported service promises. Useful corrections approved by a person are checked before entering the knowledge base.'),
      concept('oliva-report-concept.webp','Related delivery method: turn “Did this cause it?” into “Where should we investigate next?”',
        'A conceptual reconstruction of a related report-iteration method, not the original client report or a verified authorship contribution by Oliva. The curves explain the structure only.',
        'Putting customer feedback beside sales on the left still leaves a hypothesis. The right separates traffic, conversion and average order value, then connects customer feedback to the relevant investigation questions.',
        'The report first checks whether the proposed attribution holds, then gives operations, product and support teams questions they can take forward. The analytical contribution is to turn a conclusion into a next action.')
    ],
    extension:{title:'How does a report move from description to action?',steps:[
      ['Describe what happened','Organize changes and their timing first, so readers work from consistent definitions.'],
      ['Check the initial hypothesis','Changes occurring together do not establish causation. Revise the question when the evidence does not support it.'],
      ['Identify the next task','Break down the business process and list the missing information, checks and teams that will take over.']
    ]}
  },
  atlas:{
    title:'Sometimes the most important part of a report is the connection still missing.',
    intro:'Atlas breaks experience into investigation areas, sources, signals and reports. The illustration shows how evidence is cross-checked and how information gaps shape the next task.',
    cover:'atlas-en.svg',
    images:[concept('atlas-concept.webp','Trace the evidence you have, and make the evidence you lack visible too.',
      'An anonymous investigation-method board. The leads are examples and do not assess any real project.',
      'The central question connects timing, community, identity and content. Dashed lines preserve missing sources. The right separates observations, provenance, conflicts, missing information and next actions.',
      'Atlas maps investigation experience into collection, signals and reporting, then checks rules against code one by one. Collection failures must retain their status and cannot appear as an absence of anomalies.')],
    extension:{title:'From an individual judgment to an investigation others can verify.',steps:[
      ['Define the question','Reconstruct how experts investigate before selecting technology and data sources.'],
      ['Give every observation a source','Connect signals to their sources; show conflicts and missing information separately.'],
      ['Let the next person retrace the work','Provide a verification path and open questions rather than replacing judgment with a single score.']
    ]}
  },
  nora:{
    title:'One action, one meaning. The same principle on every screen.',
    intro:'Nora’s product work includes defining what each child’s action means and keeping content, audio and layouts across devices consistent with those principles.',
    cover:'nora-en.svg',
    images:[concept('nora-concept.webp','Guess, reveal a clue, choose to listen, move on: design each action separately.',
      'A card board redesigned around the interaction principles in this case, not a screenshot of the original app.',
      'Clues, audio and moving to the next card respond to separate user intentions. The right explains why these three actions should stay distinct. The mobile implementation must follow the same principles.',
      'Nora separates switching cards from playback while handling clue content, batch audio production and resumable work. An installation package marks a delivery stage; learning outcomes still require separate validation.')],
    extension:{title:'Three product tasks sit behind the illustrated cards.',steps:[
      ['Specific clues','Distinguish even similar objects by their characteristics and use contexts, rather than applying one broad hint to all of them.'],
      ['Resumable asset production','Resume batch tasks such as audio generation card by card, handling failed items separately.'],
      ['Consistent action meanings','Switching does not automatically play audio; viewing a clue does not establish mastery. Layout and data interpretation follow the same distinction.']
    ]}
  },
  leo:{
    title:'Make time definitions clear so a busy daily report stays accurate.',
    intro:'Each record has an event time and an ingestion time. Leo handles collection, deduplication, backfills and daily handover so “new” matches its business meaning.',
    cover:'leo-en.svg',
    images:[
      concept('leo-concept.webp','From questions in comments to the support team’s daily worklist.',
        'A method example showing comment monitoring and operations handover, not real customer data.',
        'Check event times, handling history and collection gaps before turning raw comments into a list of new issues with sources. Support and operations decide how to respond. A supplementary board walks through the three-record calculation in more detail.',
        'Leo repairs collection and the meaning of the daily report: define the window by event time, compare against historical records, and list failures and backfills separately.'),
      board('leo-operations.svg','Recalculate the same records using the same definitions.',
        'A zoomable teaching board with three example records.',
        'Check each row’s event time, ingestion status and history before deciding whether it counts as new.',
        'The next owner should be able to explain how a total was calculated, rather than only confirming that a task ran.')
    ],
    extension:{title:'A daily handover should explain at least three things.',steps:[
      ['What is new','Define the business window and retain records that can be checked individually.'],
      ['What needs handling','Group tasks by issue type for support or operations to assess.'],
      ['What this run covered','Show normal collection, failures, late arrivals and backfills separately so gaps remain visible.']
    ]}
  },
  velia:{
    title:'One shared understanding of the product supports four actionable marketing tasks.',
    intro:'Velia starts with product and competitor information, then carries the working brief into content, creator outreach, channel plans and business presentations. Each stage builds on the judgment made before it.',
    cover:'velia-en.svg',
    images:[concept('velia-concept.webp','Four grounded adaptations of the same brief, rather than four fresh starts.',
      'A board showing relationships between marketing deliverables. It illustrates the method, not original client drafts.',
      'Facts, differences and user benefits remain on the left. The right separates content messaging, creator briefs, channel timing and business narratives. Each output supports a different next step.',
      'Velia aligns product facts before adapting materials for different audiences. When revising a strategy, she revisits agreed bundles and constraints so the new plan carries confirmed decisions forward.')],
    extension:{title:'Four deliverables share one working brief.',steps:[
      ['Content messaging','Adjust the order of selling points for each audience and context while keeping product facts consistent.'],
      ['Creator briefs','Connect benefits to the channel’s audience and propose content that can be demonstrated.'],
      ['Channel plans','Carry forward the agreed priority bundle and business constraints before scheduling content and activity.'],
      ['Business presentations','Reorder the evidence for different audiences and deliver material they can continue using.']
    ]}
  },
  iris:{
    title:'From “What do you like?” to “How would you buy?”',
    intro:'Iris separates interest, use contexts, purchase intent and concerns, then brings the findings into content and business discussions. The post-launch review asks what the original questions missed.',
    cover:'iris-en.svg',
    images:[
      concept('iris-concept.webp','Research should make the next round of choices clearer.',
        'A working board connecting user research to action. It contains no real survey, prices or preference distributions.',
        'Survey analysis first produces content tasks and conditional bundle recommendations. After launch, the actual offer reveals purchase paths omitted from the original questions, informing the next round of research.',
        'Iris analyzes an existing survey and translates findings into messaging priorities and research recommendations. After launch, the actual offer is used to revisit assumptions and formulate more precise questions.'),
      board('iris-decisions.svg','What decisions do four types of research information support?',
        'A review-method board, not a statistical chart from the original survey.',
        'Feature interest informs the messaging entry point; use contexts inform content tasks; intent and concerns inform validation and business discussions.',
        'Keep the denominators and meanings of different questions separate. Attention cannot be treated directly as sales.'),
      board('iris-bundle.svg','Ask what people would buy before asking what they would pay.',
        'An example question structure for the next research round, not a validated pricing plan.',
        'Replace one question about the whole package with three purchase paths: the core product, an extension and the complete bundle.',
        'The improvement is in the questions: people willing to buy the core product may not need every extension.')
    ]
  },
  ruby:{
    title:'A creator pitch works when the recipient can see what they could film.',
    intro:'The same family motion-gaming device needs different content proposals for family channels and technology reviewers. After a reply, the team receives the proposed terms, open questions and next steps.',
    cover:'ruby-en.svg',
    images:[
      concept('ruby-concept.webp','Creator outreach connects the work after the first email too.',
        'An anonymous story-idea board accompanying this page’s pitch examples, not a sent email or published video.',
        'Move from understanding a channel’s audience to a filmable proposal, then handle replies, retain the original thread and hand over unresolved commercial points. Pitches for two different channel types are developed in full below.',
        'Ruby develops pitches from product information and channel content, then sets next actions by reply type. The team decides whether to proceed with commercial discussions and production. Execution ends and records are archived when the project stops.'),
      board('ruby-pitch.svg','Turn “What our product has” into “What you could film.”',
        'An anonymous story-idea example, not an original email or a sent draft.',
        'Family-content channels and technology reviewers have different audience relationships and demonstration tasks.',
        'A specific scene, a content proposal and a clear next step make personalization more meaningful than changing the greeting.'),
      board('ruby-handoff.svg','Different stages need different handover information.',
        'A method board with no real contacts, quotes or collaboration counts.',
        'Interest, format confirmation, commercial discussion and a pause cannot all be labeled “in progress.”',
        'Retain the thread and agreed points. Explain who takes over, what still needs asking and which conditions remain unconfirmed.')
    ],
    extension:{title:'What is useful to retain as a relationship progresses?',steps:[
      ['Candidates with a reason to fit','Relate the channel’s audience to the product task rather than ranking by follower count alone.'],
      ['Replies with a next step','Clear status, outstanding questions and an owner allow the opportunity to progress.'],
      ['Results separated by stage','Record intent, quotes, contracts, publication and sales attribution separately so the review has a sound basis for comparison.']
    ]}
  }
};
