/* English curriculum content for FHR (Baden-Württemberg).
   Original explanations and original short texts. No copyrighted material. */
(function (root) {
    const EN = {
        operators: {
            id: 'operators',
            title: 'Operator words (English)',
            type: 'lesson',
            summary: 'Operator words tell you what to do. Read the operator first, then the rest of the prompt.',
            sections: [
                { h: 'Levels of demand (AFB)', html: '<p>The official list for the Berufskolleg in Baden-Württemberg places each instruction word in a <strong>level of demand</strong>. For English:</p><ul><li><strong>AFB I</strong> (reproduction): outline, summarise, describe, state</li><li><strong>AFB II</strong> (analysis): analyse, examine, compare, contrast</li><li><strong>AFB III</strong> (comment / discuss): comment on, discuss, evaluate, justify</li></ul>' },
                { h: 'Common operators', html: '<ul><li><em>outline</em> – list the main points briefly</li><li><em>explain</em> – give reasons or details</li><li><em>discuss</em> – present both sides and give your opinion</li><li><em>justify</em> – give good reasons to support a position</li><li><em>evaluate</em> – judge something using clear criteria</li><li><em>comment on</em> – state and justify your personal opinion</li><li><em>summarise</em> – give the main points in a shorter form</li><li><em>analyse</em> – examine content, structure and language</li></ul>' },
                { h: 'Tip', html: '<p>Highlight the operator in the prompt. Build a short plan: <em>“Operator = X → I will Y.”</em> This avoids writing the wrong task by accident.</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'operators', q: 'Which operator asks for a personal opinion with reasons?', options: ['outline', 'comment on', 'summarise', 'list'], answer: 1, explanation: '„Comment on" asks for your opinion, supported by reasons.' },
                { type: 'mc', topic: 'operators', q: 'Which operator requires you to look at both sides?', options: ['justify', 'describe', 'discuss', 'translate'], answer: 2, explanation: '„Discuss" requires presenting both sides and reaching a conclusion.' }
            ]
        },

        comment: {
            id: 'comment',
            title: 'Writing a Comment',
            type: 'lesson',
            summary: 'A comment states and justifies your opinion on a text or issue. Structure it clearly and refer to the text.',
            sections: [
                { h: 'Structure', html: '<ol><li><strong>Introduction:</strong> reference the text, state your opinion</li><li><strong>Main body:</strong> reasons and examples</li><li><strong>Conclusion:</strong> summarise your view and a final thought</li></ol>' },
                { h: 'Useful phrases', html: '<div class="example"><strong>Introduction:</strong> The text by … deals with the issue of … . In my opinion, … .<br><strong>Adding a reason:</strong> This is because … / The author points out that …<br><strong>Counter-argument:</strong> Admittedly, … / On the other hand, …<br><strong>Conclusion:</strong> To sum up, I believe that … .</div>' }
            ],
            exercises: [
                { type: 'mc', topic: 'comment', q: 'Which sentence is the best opening for a comment?', options: ['In my opinion, social media harms teenagers.','The text by John Smith deals with the role of social media in teenagers’ lives.','Social media is bad.','Many people use social media.'], answer: 1, explanation: 'A good opening references the text and the issue.' },
                { type: 'sort', topic: 'comment', title: 'Order the parts of a comment', items: ['Introduction: reference the text and your opinion','Main body: reasons and examples','Conclusion: summary and final thought'] }
            ]
        },

        mediation: {
            id: 'mediation',
            title: 'Mediation',
            type: 'lesson',
            summary: 'Mediation means transferring the content of one text to a different audience. You adapt the register and style.',
            sections: [
                { h: 'Steps', html: '<ol><li>Identify the key information in the source text.</li><li>Identify the target audience and their needs.</li><li>Adapt vocabulary and register (formal vs. informal).</li><li>Summarise where appropriate; explain cultural references.</li><li>Keep the original meaning; do not add personal opinions.</li></ol>' },
                { h: 'Example', html: '<div class="example"><strong>Source:</strong> A German article about the city of Karlsruhe.<br><strong>Target audience:</strong> English-speaking exchange students.<br><strong>Task:</strong> Write a short email informing them about sights and student life.</div>' }
            ],
            exercises: [
                { type: 'mc', topic: 'mediation', q: 'What is the main goal of a mediation task?', options: ['Translate word for word','Adapt content for a different audience','Give your own opinion','Invent new information'], answer: 1, explanation: 'Mediation adapts content, register and language.' }
            ]
        },

        summary: {
            id: 'summary',
            title: 'Summary',
            type: 'lesson',
            summary: 'A summary gives the main points of a text in your own words, in a shorter form and without personal opinion.',
            sections: [
                { h: 'Rules', html: '<ul><li>About one third of the original length.</li><li>Use your own words.</li><li>Stay neutral — no personal opinion.</li><li>Use indirect speech for statements.</li><li>Cover all main points, no examples or details.</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'summary', q: 'Which sentence is suitable for a summary?', options: ['I think the author is wrong.','The author argues that renewable energy is essential.','Climate change is the worst problem ever.','The text is boring.'], answer: 1, explanation: 'A summary stays neutral and reports the main point in your own words.' }
            ]
        },

        reading: {
            id: 'reading',
            title: 'Reading Comprehension',
            type: 'lesson',
            summary: 'Read the text twice: first for the gist, then for details. Underline key arguments.',
            sections: [
                { h: 'Strategy', html: '<ol><li>Skim: read the title, the first sentence of each paragraph and the conclusion.</li><li>Identify the topic and the author’s main claim.</li><li>Read carefully: underline key arguments and examples.</li><li>Answer the questions in full sentences, referring to the text.</li></ol>' }
            ],
            exercises: [
                { type: 'mc', topic: 'reading', q: 'You read an article about the future of work. What is the most important first step?', options: ['Look at the pictures','Skim the text to find the main claim and structure','Write your own opinion','Translate the article'], answer: 1, explanation: 'Skimming helps you understand the structure and the main claim first.' }
            ]
        },

        grammar_tenses: {
            id: 'grammar_tenses',
            title: 'Grammar – Tenses and Conditionals',
            type: 'lesson',
            summary: 'Tenses carry meaning. The choice between present perfect, past simple and other tenses signals time relationships.',
            sections: [
                { h: 'Present Perfect vs Past Simple', html: '<div class="example"><strong>Past Simple:</strong> I visited Paris last year. (finished, time is clear)<br><strong>Present Perfect:</strong> I have visited Paris three times. (experience, no exact time)</div>' },
                { h: 'Conditionals', html: '<ul><li><strong>Type 1:</strong> If it rains, we will stay inside. (real/likely)</li><li><strong>Type 2:</strong> If it rained, we would stay inside. (unreal/unlikely)</li><li><strong>Type 3:</strong> If it had rained, we would have stayed inside. (past unreal)</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'grammar_tenses', q: 'Choose the correct sentence.', options: ['I have been to Italy last summer.','I went to Italy last summer.','I have went to Italy last summer.','I was going to Italy last summer.'], answer: 1, explanation: 'With a finished time, use Past Simple.' },
                { type: 'mc', topic: 'grammar_tenses', q: 'Which conditional describes an unreal present?', options: ['If it rains, I will stay at home.','If it rained, I would stay at home.','If it had rained, I would have stayed at home.','If it will rain, I stay at home.'], answer: 1, explanation: 'Conditional Type 2.' },
                { type: 'error', topic: 'grammar_tenses', text: 'If I would have more time, I will learn Spanish. Yesterday I have went to the library and I have read a book.', corrections: [
                    { find: 'If I would have more time', replace: 'If I had more time', why: 'Type 2 conditional: „If + past simple".' },
                    { find: 'I will learn', replace: 'I would learn', why: 'Type 2 conditional main clause uses „would + infinitive".' },
                    { find: 'I have went', replace: 'I went', why: 'Irregular past participle of „go" is „gone".' }
                ] }
            ]
        },

        formal_informal: {
            id: 'formal_informal',
            title: 'Formal and informal language',
            type: 'lesson',
            summary: 'In exams, you usually write in a neutral, formal register. Recognise the differences and avoid contractions and slang.',
            sections: [
                { h: 'Differences', html: '<ul><li>want → would like</li><li>get → receive / obtain</li><li>a lot of → numerous / a great deal of</li><li>thing → matter / factor / issue</li><li>don’t / can’t → do not / cannot</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'formal_informal', q: 'Which sentence is most appropriate for a formal email?', options: ['Hey, I wanna ask about my application.','Hi there, can you help me out?','Dear Sir or Madam, I am writing to enquire about my application.','Yo, what’s up with my application?'], answer: 2, explanation: 'A formal email uses a polite greeting, full forms and a clear purpose.' }
            ]
        },

        vocabulary_themes: {
            id: 'vocabulary_themes',
            title: 'Themed vocabulary',
            type: 'lesson',
            summary: 'Build topic-based vocabulary lists. Active recall beats passive re-reading.',
            sections: [
                { h: 'Topics that often appear', html: '<ul><li>Education and work</li><li>Technology and the internet</li><li>Environment and sustainability</li><li>Society and migration</li><li>Media and communication</li></ul>' }
            ],
            exercises: [
                { type: 'match', topic: 'vocabulary_themes', title: 'Match the word and the topic', pairs: [['renewable','Environment'],['apprenticeship','Education and work'],['misinformation','Media'],['data protection','Technology']] }
            ]
        },

        // NEW LESSONS
        conditional_drills: {
            id: 'conditional_drills',
            title: 'Conditional drills',
            type: 'lesson',
            summary: 'Drills for all three conditional types plus mixed conditional forms.',
            sections: [
                { h: 'Mixed Conditionals', html: '<div class="example"><em>If I had studied medicine, I would be a doctor now.</em> (Past condition, present result.)<br><em>If I were smarter, I would have passed the exam.</em> (Present condition, past result.)</div>' }
            ],
            exercises: [
                { type: 'mc', topic: 'grammar_tenses', q: 'If I ___ more time, I ___ Spanish.', options: ['had, would learn','would have, will learn','have, would learnt','had, will learn'], answer: 0, explanation: 'Type 2: If + past simple, would + infinitive.' },
                { type: 'fill', topic: 'grammar_tenses', q: 'Complete the conditional.', text: 'If she ___ (study) harder, she ___ (pass) the exam.', answers: [['had studied'], ['would have passed']], explanation: 'Type 3 conditional.' }
            ]
        },

        passive_voice: {
            id: 'passive_voice',
            title: 'Passive voice',
            type: 'lesson',
            summary: 'Use the passive to focus on the action rather than the agent. Useful in scientific and journalistic contexts.',
            sections: [
                { h: 'Form', html: '<p>Active: <em>The company builds the cars.</em><br>Passive: <em>The cars are built by the company.</em></p><p>Tenses: am/is/are + past participle (present); was/were + past participle (past); will be + past participle (future).</p>' }
            ],
            exercises: [
                { type: 'mc', topic: 'grammar_tenses', q: 'Choose the correct passive form: „The bridge ___ in 1962."', options: ['is built','was built','has built','built'], answer: 1, explanation: 'Past passive: was/were + past participle.' }
            ]
        },

        reported_speech: {
            id: 'reported_speech',
            title: 'Reported speech',
            type: 'lesson',
            summary: 'When you report what someone said, shift tenses back and adjust pronouns and time markers.',
            sections: [
                { h: 'Tense shift', html: '<ul><li>present simple → past simple</li><li>present continuous → past continuous</li><li>past simple → past perfect</li><li>will → would</li><li>can → could</li></ul><div class="example"><em>“I am tired.” → He said (that) he was tired.</em></div>' }
            ],
            exercises: [
                { type: 'mc', topic: 'grammar_tenses', q: 'Reported speech: „I will come tomorrow." → He said ___', options: ['he will come tomorrow','he would come the next day','he comes tomorrow','he had come tomorrow'], answer: 1, explanation: 'will → would, tomorrow → the next day.' }
            ]
        },

        articles_and_quantifiers: {
            id: 'articles_and_quantifiers',
            title: 'Articles and quantifiers',
            type: 'lesson',
            summary: 'Choose a/an, the, or no article correctly. Use quantifiers (some, any, much, many, few, little) to express quantity.',
            sections: [
                { h: 'Rules', html: '<ul><li><strong>a/an</strong>: indefinite, singular countable (a book)</li><li><strong>the</strong>: definite, unique, already mentioned (the sun, the book I mentioned)</li><li><strong>no article</strong>: plural or uncountable in general (books are expensive)</li></ul><div class="example"><em>She is a teacher. The teacher we met is friendly.</em></div>' }
            ],
            exercises: [
                { type: 'fill', topic: 'vocabulary_themes', q: 'Fill in the article.', text: '___ Eiffel Tower is in Paris. ___ tower is 330 metres high.', answers: [['The'], ['The']], explanation: 'Unique, well-known landmarks take „the".' }
            ]
        },

        prepositions: {
            id: 'prepositions',
            title: 'Prepositions of time and place',
            type: 'lesson',
            summary: 'Common prepositions and their typical uses: in, on, at, by, since, for, between, among.',
            sections: [
                { h: 'Time', html: '<ul><li><strong>at</strong> + clock time (at 5 pm)</li><li><strong>on</strong> + day/date (on Monday, on 12 May)</li><li><strong>in</strong> + month/year/season (in May, in 2026, in summer)</li><li><strong>since</strong> + point in time (since 2020)</li><li><strong>for</strong> + duration (for three years)</li></ul>' },
                { h: 'Place', html: '<ul><li><strong>at</strong> + specific point (at the door)</li><li><strong>in</strong> + enclosed space (in the room)</li><li><strong>on</strong> + surface (on the table)</li><li><strong>between</strong> + two items</li><li><strong>among</strong> + more than two</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'vocabulary_themes', q: 'I have lived in Karlsruhe ___ 2018.', options: ['for','since','from','on'], answer: 1, explanation: '„Since" + point in time.' }
            ]
        },

        linking_words: {
            id: 'linking_words',
            title: 'Linking words and connectors',
            type: 'lesson',
            summary: 'Connectors shape the logical flow of your text. Use them to add, contrast, give reasons or show consequences.',
            sections: [
                { h: 'Common connectors', html: '<ul><li><strong>Addition:</strong> furthermore, in addition, moreover</li><li><strong>Contrast:</strong> however, nevertheless, on the one hand … on the other hand</li><li><strong>Cause:</strong> because, since, as, due to</li><li><strong>Effect:</strong> therefore, consequently, as a result</li><li><strong>Conclusion:</strong> in conclusion, to sum up</li></ul>' }
            ],
            exercises: [
                { type: 'match', topic: 'comment', title: 'Connector to function', pairs: [['however','contrast'],['therefore','cause/effect'],['in addition','addition'],['because','cause']] }
            ]
        },

        collocations: {
            id: 'collocations',
            title: 'Common collocations',
            type: 'lesson',
            summary: 'Some word pairs appear together naturally (collocation). Use them to sound more fluent.',
            sections: [
                { h: 'Examples', html: '<ul><li>make a decision (NOT do a decision)</li><li>do homework (NOT make homework)</li><li>take an exam (NOT make an exam)</li><li>heavy rain (NOT strong rain)</li><li>strong coffee (NOT heavy coffee)</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'vocabulary_themes', q: 'Which is the correct collocation?', options: ['do a mistake','make a mistake','take a mistake','have a mistake'], answer: 1, explanation: '„Make a mistake" is the standard collocation.' }
            ]
        },

        phrasal_verbs: {
            id: 'phrasal_verbs',
            title: 'Phrasal verbs – basics',
            type: 'lesson',
            summary: 'Phrasal verbs combine a verb with a particle. They often have idiomatic meanings.',
            sections: [
                { h: 'Examples', html: '<ul><li><strong>give up</strong> – stop trying (He gave up smoking.)</li><li><strong>look forward to</strong> – await with pleasure (I look forward to hearing from you.)</li><li><strong>take off</strong> – leave the ground (The plane takes off at 10.)</li><li><strong>bring up</strong> – mention / raise a child (She brought up three children.)</li></ul>' }
            ],
            exercises: [
                { type: 'match', topic: 'vocabulary_themes', title: 'Phrasal verb and meaning', pairs: [['give up','stop trying'],['look forward to','await with pleasure'],['take off','leave the ground'],['bring up','raise a child']] }
            ]
        },

        charts_and_descriptions: {
            id: 'charts_and_descriptions',
            title: 'Describing charts and trends',
            type: 'lesson',
            summary: 'In mediation and discussion tasks, you may have to describe a chart. Use neutral language and trend verbs.',
            sections: [
                { h: 'Useful phrases', html: '<ul><li><strong>Rise:</strong> increase, rise, grow, climb</li><li><strong>Fall:</strong> decrease, drop, fall, decline</li><li><strong>Stable:</strong> stay constant, remain unchanged</li><li><strong>Comparison:</strong> compared to, in contrast to, whereas</li></ul><div class="example">„Sales rose by 12 % in 2025, whereas in 2024 they remained unchanged."</div>' }
            ],
            exercises: [
                { type: 'mc', topic: 'mediation', q: 'Which sentence describes a chart correctly?', options: ['Sales are good.','Sales rose by 12 % in 2025, while in 2024 they fell slightly.','Sales.','I think sales are high.'], answer: 1, explanation: 'Describe trends with specific verbs and, ideally, numbers.' }
            ]
        },

        letter_writing: {
            id: 'letter_writing',
            title: 'Letter and email writing',
            type: 'lesson',
            summary: 'A formal letter or email follows a fixed structure: greeting, purpose, details, closing.',
            sections: [
                { h: 'Structure', html: '<ol><li><strong>Sender address / date</strong> (top right)</li><li><strong>Recipient</strong></li><li><strong>Subject</strong></li><li><strong>Greeting:</strong> Dear Sir or Madam, / Dear Mr / Ms …</li><li><strong>Body:</strong> purpose → details → closing remark</li><li><strong>Sign-off:</strong> Yours sincerely / Yours faithfully</li></ol>' }
            ],
            exercises: [
                { type: 'sort', topic: 'comment', title: 'Order a formal email', items: ['Subject','Greeting','Body: purpose','Body: details','Body: closing remark','Sign-off'] }
            ]
        },

        listening_strategy: {
            id: 'listening_strategy',
            title: 'Listening strategy',
            type: 'lesson',
            summary: 'Use a two-pass strategy: first listen for gist, second listen for details.',
            sections: [
                { h: 'Steps', html: '<ol><li>Read the questions first to know what to listen for.</li><li>First listen: focus on the main idea.</li><li>Second listen: note down specific details.</li><li>Check your answers against the context.</li></ol>' }
            ],
            exercises: [
                { type: 'mc', topic: 'reading', q: 'What is the best first step before a listening task?', options: ['Look at the pictures','Read the questions first','Translate everything','Write a draft answer'], answer: 1, explanation: 'Knowing the questions focuses your listening.' }
            ]
        },

        exam_strategy: {
            id: 'exam_strategy',
            title: 'Exam strategy',
            type: 'lesson',
            summary: 'Time management is key. Read tasks carefully, plan your answer, leave time to check.',
            sections: [
                { h: 'Time plan', html: '<ul><li>10 % reading and planning</li><li>70 % writing</li><li>10 % self-check</li><li>10 % buffer</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'comment', q: 'How much of your time should you leave for checking?', options: ['0 %','At least 10 %','50 %','90 %'], answer: 1, explanation: 'Always leave time to read your text again.' }
            ]
        },

        translation_common_mistakes: {
            id: 'translation_common_mistakes',
            title: 'Common German–English pitfalls',
            type: 'lesson',
            summary: 'False friends, word order, tense choice – frequent traps when switching between German and English.',
            sections: [
                { h: 'Words that are easy to confuse', html: '<ul><li><em>actually</em> means in fact; <em>current</em> means happening now.</li><li><em>eventually</em> means in the end; <em>possibly</em> means perhaps.</li><li><em>realise</em> can mean become aware of; <em>implement</em> means put a plan into action.</li><li><em>sympathy</em> means understanding another person’s suffering; <em>liking</em> means having a positive feeling about someone.</li></ul>' }
            ],
            exercises: [
                { type: 'mc', topic: 'vocabulary_themes', q: 'Which sentence means putting a planned project into action?', options: ['I will realise the project.','I will become aware of the project.','I will implement the project.','I will be sympathetic to the project.'], answer: 2, explanation: 'Implement means put a plan into action. Become aware of means notice or understand something.' }
            ]
        }
    };

    const EN_LESSONS = Object.values(EN).map(l => Object.assign({}, l));

    function get(id) { return EN[id] || null; }
    function allExercises() {
        const out = [];
        for (const l of Object.values(EN)) {
            for (const ex of (l.exercises || [])) {
                out.push(Object.assign({ subject: 'en', topic: ex.topic || l.id }, ex, { lessonId: l.id, lessonTitle: l.title }));
            }
        }
        return out;
    }

    root.ContentEN = { byId: EN, list: EN_LESSONS, get, allExercises };
})(window);
// EXPANDED 2026-09-03: added 3 new exercises
(function(root) { if (!root.ContentEN || !root.ContentEN.byId) return; const l = root.ContentEN.byId['phrasal_verbs']; if (l && l.exercises) { l.exercises.push({ type: 'mc', topic: 'phrasal_verbs', q: '"Give up" means …', options: ['to start', 'to stop trying', 'to continue', 'to find out'], answer: 1, explanation: 'Give up = aufgeben.' }); l.exercises.push({ type: 'fill', topic: 'phrasal_verbs', text: 'Please ___ the volume; it is too loud.', answers: [['turn down']], explanation: 'Turn down = leiser stellen.' }); l.exercises.push({ type: 'match', topic: 'phrasal_verbs', title: 'Phrasal verb → meaning', pairs: [['figure out','understand'],['run out of','have none left'],['put off','postpone'],['take over','assume control']] }); } })(window);
// EXPANDED 2026-09-03: new lesson "debate_skills"
(function(root) {
  if (!root.ContentEN) return;
  const byId = root.ContentEN.byId = root.ContentEN.byId || {};
  const list = root.ContentEN.list = root.ContentEN.list || [];
  if (byId['debate_skills']) return;
  const lesson = {
    id: 'debate_skills',
    title: 'Debate skills for the oral exam',
    type: 'lesson',
    summary: 'How to structure an argument, rebut a counter-argument, and conclude a debate in English.',
    sections: [
      { h: 'STEER structure', html: '<p>State the point → Explain → give an Example → Repeat key idea. This keeps your position clear even under time pressure.</p>' },
      { h: 'Rebutting', html: '<p>Use signal phrases: "I see your point, but …", "That is true, however …", "On the contrary …". Stay factual, not personal.</p>' }
    ],
    exercises: [
      { type: 'mc', topic: 'debate_skills', q: 'What does STEER stand for?', options: ['Speak, Test, Explain, End, Restate', 'State, Tell, Evidence, End, Result', 'State, Tell, Example, End, Repeat', 'State, Explain, Example, End, Repeat'], answer: 3, explanation: 'State–Explain–Example–End–Repeat.' },
      { type: 'sort', topic: 'debate_skills', items: ['Open clearly','State your position','Give reasons and examples','Acknowledge counter-arguments','Conclude'], explanation: 'Debate structure.' },
      { type: 'free', topic: 'debate_skills', q: 'Write a 3-sentence rebuttal to: "Social media is a waste of time."', explanation: 'Use signal phrases.' }
    ]
  };
  byId['debate_skills'] = lesson;
  list.push(lesson);
})(window);
