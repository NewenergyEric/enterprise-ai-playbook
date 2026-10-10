// Anonymous editorial excerpts from inspected local project reports.
// Source paths, hashes and attribution limits are recorded privately, never published.
export default {
  oliva:{
    eyebrow:'REPORT NOTES / Knowledge engineering',
    title:'A useful optimization can also mean\ndeciding not to enable it yet.',
    intro:'A related support-knowledge project tested the same questions with different retrieval strategies, then compared answers and sources. The report went beyond feature counts to examine which materials were selected, which facts were missed and which promises should not have appeared.',
    label:'01 / Strategy comparison',
    heading:'Find the approach that suits the current knowledge base, rather than selecting the most complex one.',
    columns:['Approach evaluated','Key observation in the report','Decision at the time'],
    rows:[
      ['Baseline vector retrieval','Unconfirmed conditions were not turned into promises; some multi-part questions still had omissions.','Keep the baseline','keep'],
      ['Add time and validity governance','No obvious harm to answers, but the old index lacked sufficient governance fields and benefits were inconsistent.','Observe on a small scale','watch'],
      ['Add hybrid retrieval','Exact-term matching helped, but also promoted noise from internal daily reports, leading to inappropriate promises.','Do not enable yet','hold'],
      ['Enable several enhancements together','The existing index lacked parent-child relationships. Enabling features alone could not provide full context.','Organize the material first','hold']
    ],
    insight:'Check both whether something was retrieved and what was retrieved. Official specifications, approved FAQs, historical daily reports and raw tickets should not carry equal factual weight.',
    spread:{
      label:'02 / Tracing an incorrect reply',
      title:'The campaign has ended. Why is the answer still inviting an order?',
      question:'The user asks: Can I still buy now? How can I check progress afterward?',
      beforeTitle:'On the surface: fluent text with sources',
      before:'Old campaign language entered the answer. Outdated purchase information could remain even after a review step was added.',
      afterTitle:'What needs fixing: intent, validity and source granularity',
      after:'Check the actual wording against the retrieved sources. Separate campaign-stage knowledge from fulfillment-stage knowledge, and keep expired entries and missing conditions out of current promises.',
      chain:[
        ['User wording','Conversational wording missed the relevant intent, so the intended retrieval strategy did not run.'],
        ['Candidate material','One FAQ mixed entries from different business stages; file-level tags were too coarse.'],
        ['Repair and retest','Expand coverage of real question phrasing, check retrieval and ranking of old entries, then retest the same questions.'],
        ['Ongoing governance','Attach validity periods, applicable stages and source types to individual knowledge entries rather than hard-coding project facts in shared code.']
      ]
    },
    outputs:[['Comparison record','The same question, different strategies, selected sources and changes in the answer.'],['Release decisions','Which baseline to keep, what to observe and what to defer.'],['Repair list','Intent coverage, entry validity, index structure and traceability.']],
    footnote:'Reorganized from strategy evaluations and incident reviews in related knowledge-engineering work. Names, dates, original questions and answers, and project parameters are omitted. These excerpts explain relevant engineering judgments without attributing an entire project’s results to one participant.'
  },
  steve:{
    eyebrow:'REPORT NOTES / Advertising analysis',
    title:'Before trusting a chart,\ncheck its inputs and definitions.',
    intro:'Reports from a related advertising-analysis project documented varying naming conventions, field sources and data-cleaning issues. Technical verification reaches beyond algorithms: what enters upstream directly changes downstream analysis and recommendations.',
    label:'01 / Trace the report back to its inputs',
    heading:'Files labeled “advertising data” can require very different checks.',
    columns:['Report finding','If the check is skipped','Resulting approach'],
    rows:[
      ['Product and strategy information span two columns','Parsing only the campaign name misses product information in the portfolio name.','Combine both columns','keep'],
      ['Chinese, English and abbreviations are mixed','Splitting at fixed positions can assign meanings to the wrong dimensions.','Identify by meaning','keep'],
      ['Metadata appears at the top of the file','Treating the first row as the header can break field identification and whole-table statistics.','Locate the real header','watch'],
      ['Splitting overwrote original fields','The result looks tidy, but the next owner loses the path back to the source record.','Retain original and derived columns','keep'],
      ['Fine-grained records and sparse samples','Too few clicks or excessively narrow units do not support direct advertising decisions.','Check granularity first','watch']
    ],
    insight:'Successful upload and suitability for analysis are separate acceptance checks. Retain original records, explain transformations, then check row counts, metrics and module dependencies to locate the layer causing an anomaly.',
    spread:{
      label:'02 / A cleaning result that can be checked',
      title:'Create new dimensions while retaining the original record.',
      question:'Example: one campaign name contains a product, advertising format and match type.',
      beforeTitle:'Only the split result remains',
      before:'Product A / Sponsored Products / Phrase match. These are new dimensions, but the original name is no longer available for checking the interpretation.',
      afterTitle:'Original field + Derived dimensions',
      after:'Keep the full name alongside separate product, format and match-type fields. If an item is misidentified, the original record remains available for another check.',
      chain:[
        ['Readable file','Confirm encoding, the real header, business-data rows and empty-table status.'],
        ['Interpretable dimensions','Combine portfolio and campaign names while handling language and naming differences.'],
        ['Reconcilable metrics','Check spend, order and sales fields. Do not mix attribution windows in one calculation.'],
        ['Usable modules','Check the inputs needed for channel, search-term and share analysis. Do not present a complete conclusion when a required source is missing.']
      ]
    },
    outputs:[['Data intake rules','Which reports can feed which modules, and which fields are required.'],['Transformation and issue records','Retain original columns, record derived fields and flag items needing human confirmation.'],['Analysis prerequisites','Explain sample granularity, attribution windows and information gaps before discussing advertising decisions.']],
    footnote:'Drawn from data research, cleaning repairs and acceptance documents for related advertising-analysis work. Example names have been rewritten; accounts, budgets, campaign names and performance figures are omitted. This does not change Steve’s role as an independent verifier rather than the original tool’s author.'
  }
};
