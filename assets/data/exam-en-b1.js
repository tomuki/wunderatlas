/* Independently authored B1 material. Cambridge Preliminary provides the format,
   not these texts, answer keys or an official score conversion. */
(function(root){
const parts=[];
function group(section,context,qs){qs.forEach(([q,options,answer,explanation],i)=>parts.push({type:'mc',topic:'b1_reading',section:i===0?section:null,context:i===0?context:null,q,options,answer,explanation}));}
group('Part 1 · Short messages · Questions 1–5',null,[
['Studio notice: Return borrowed brushes to the sink, not the cupboard. Staff will clean them before the next class. What should students do?',['Wash brushes and put them away.','Leave used brushes at the sink.','Keep brushes until the next class.'],1,'Students return brushes to the sink; staff do the cleaning.'],
['Message from Kim: I can collect the prints before lunch if you send me the order number. Otherwise you will need to go yourself this afternoon. Kim is offering to…',['collect the prints if she receives the necessary detail.','place a new order this afternoon.','meet her friend at the printer after lunch.'],0,'Her offer depends on receiving the order number.'],
['Gallery website: Tickets bought online are valid on the selected date only. You may change the date free of charge up to 24 hours before your visit. Visitors can…',['use a ticket on any day without changing it.','change the date after entering the gallery.','change their booking early enough without paying extra.'],2,'The change must be made at least 24 hours before the visit.'],
['Email: The portfolio meeting has moved from Room 12 to the library. The time is unchanged. Please bring your original sketches as well as your laptop. What has changed?',['The meeting place.','The starting time.','The requirement to bring sketches.'],0,'Only the location is described as changing.'],
['Library notice: The last study session ends at 7.45 p.m. The building closes at 8.00 p.m. Please allow time to pack your things. Students should…',['arrive at 7.45 to begin studying.','finish studying before the building closes.','leave their belongings overnight.'],1,'Study ends fifteen minutes before closing, leaving time to pack.']]);
const offers=`Creative activities

A · Early Photo Walk: Sundays at 8 a.m., a two-hour outdoor walk with a photographer. Bring any camera, including a phone. Beginners welcome; no indoor studio work.

B · Evening Lettering: Tuesdays at 7 p.m., learn to draw letters by hand. All paper and pens provided. No previous experience needed. Book a place for the four-week course.

C · Weekend Print Lab: Saturday afternoon workshop for beginners making prints with simple blocks. Tools and materials included; everyone takes home their own finished print.

D · Digital Archive: Explore historical posters online at any time. Search by designer or decade and read short descriptions. Free access; no live advice or equipment loans.

E · Portfolio Conversation: Book a free individual twenty-minute meeting with a design student. Bring existing work and receive suggestions for organising it. No new work is made during the meeting.

F · Shared Studio: Rent a quiet room with desks on weekday mornings. Suitable for independent groups with their own equipment. Staff cannot teach software or give design advice.

G · Camera Hire: Borrow a digital camera from Friday to Monday. A deposit and identification are required. Staff explain the basic controls; this is not a photography course.

H · Family Art Morning: Children aged six to ten create paper animals with an adult. Saturday mornings, materials included. The activity is designed for children, not adult art training.

Match each person to one activity. Use each letter only once.`;
group('Part 2 · Matching · Questions 6–10',offers,[
['Nadia wants to learn hand lettering after school. She is a beginner and has no equipment.',null,1,'B offers evening lettering for beginners with materials.'],
['Leo wants advice on choosing and arranging work he has already made for a portfolio.',null,4,'E offers individual feedback on existing work.'],
['Iman cannot travel this week but wants to research posters from the past.',null,3,'D is an online historical archive.'],
['Zoe needs a camera just for the weekend and wants a basic explanation of its controls.',null,6,'G offers weekend hire and a short explanation.'],
['Alex wants to try printing on Saturday and leave with something he has made.',null,2,'C is a Saturday print workshop with a finished print to take home.']
].map(([q,_,a,e])=>[q,['A','B','C','D','E','F','G','H'],a,e]));
group('Part 3 · A longer article · Questions 11–15',`Learning to notice

When my teacher suggested keeping a visual diary for a month, I imagined that it would be another task I had to finish late at night. I already had enough drawings to complete for class. The instruction sounded simple: record something interesting from daily life every day. But I thought that interesting things happened only when you travelled somewhere unusual. My journey to school seemed like the least exciting place to begin.

For the first week, I tried to produce a perfect drawing each evening. I spent almost an hour on one shop window and still disliked the result. By Friday, I was ready to stop. My teacher looked at the diary and asked why I had not included the quick marks on the back page. I explained that those were just notes about the patterns on a bus seat. She said they showed exactly what she wanted: something I had noticed, not a finished picture for an exhibition.

After that conversation, I changed my method. I carried a small notebook and made a few marks whenever something caught my attention. Sometimes I added a photograph later, but I always wrote a sentence about why I had chosen the subject. A bright sign was not automatically interesting. I wanted to understand why I could read one sign from across the road while another disappeared among the buildings.

The diary soon helped with a class project. We had to design a label for a reusable bottle. Instead of searching online for a style to copy, I looked through my own observations. A simple pattern from a station wall gave me an idea. The final label did not look like the wall, but it used the same rhythm of wide and narrow spaces. My classmates could not guess the source until I showed them my notes.

I still use the diary, although I no longer add something every day. It is most useful when I feel stuck. Looking back reminds me that ideas can begin with ordinary details. I would recommend it to other students, with one warning: if you spend all your time making each page beautiful, you may forget to look at the world around you.`,[
['How did the writer first feel about the diary?',['Excited about travelling for it.','Worried that it would add to her workload.','Confident that it would be easy.','Angry that classmates had less work.'],1,'She expected another task late at night and already had class drawings.'],
['What did the teacher help the writer understand?',['Only detailed drawings were useful.','Photographs were not allowed.','The diary was about observations rather than finished art.','Every page should be shown in an exhibition.'],2,'The quick notes about the bus seat met the purpose of noticing things.'],
['Why did the writer add a sentence to each observation?',['To explain what interested her about it.','To practise writing long stories.','To record the price of the object.','To avoid drawing anything at all.'],0,'She wrote why she had chosen the subject.'],
['How did the station wall influence the bottle label?',['She copied a photograph of the whole wall.','She used the station name as a brand.','She asked classmates to draw the wall.','She developed an idea from its pattern of spaces.'],3,'The rhythm inspired the label, although the final design looked different.'],
['Which statement best expresses the writer’s main message?',['Good ideas require expensive journeys.','A useful diary must contain a perfect drawing every day.','Paying attention to ordinary surroundings can support creative work.','Online pictures are always better than personal observations.'],2,'The diary helps her find ideas in everyday details.']]);
const sentences=[
'A · That made it clear that we needed a different way to share the information.',
'B · We therefore asked them to test the next version before printing it.',
'C · Once we had agreed on those limits, choosing what to include became easier.',
'D · This time, visitors reached the correct room without asking for help.',
'E · Looking back, I learned that a clear design starts with understanding its users.',
'F · Unfortunately, the building had been closed for several years.',
'G · None of us had ever used paper before.',
'H · The tickets were more expensive than we had expected.'
];
group('Part 4 · Missing sentences · Questions 16–20',`A map that people could use

Our class was asked to make a small map for an open day. At first, we drew every room in the building. The result looked impressive, but the names were so small that people had to hold the paper close to their faces. [16]

We met the organiser and asked which places visitors really needed to find. She named the entrance, the main exhibition, the workshop rooms and the toilets. She also said the map had to fit on one side of a small sheet. [17]

Our second version used fewer details and larger words. We thought the problem was solved. Then two students who did not know the building tried it. Both turned left where they should have turned right. They explained that our arrow looked as if it pointed towards a door instead of the stairs. [18]

We moved the arrow and added the word “upstairs”. The same students returned the next morning and followed the new route. [19]

At the open day, the organiser told us that fewer people had needed directions than the year before. I was pleased, but I was even happier about the way we had worked. We had stopped guessing and started listening. [20]

Choose a sentence A–H for each gap. Three sentences are not needed. Use each sentence once.

`+sentences.join('\n\n'),[
['Which sentence belongs in gap 16?',sentences,0,'The difficult-to-read first version creates the need for a different approach.'],
['Which sentence belongs in gap 17?',sentences,2,'“Those limits” refers to the required places and the available space.'],
['Which sentence belongs in gap 18?',sentences,1,'“Them” refers to the two students; their feedback leads to another test.'],
['Which sentence belongs in gap 19?',sentences,3,'The return visit shows whether the changed arrow works.'],
['Which sentence belongs in gap 20?',sentences,4,'The final reflection sums up learning from users.']]);
const vocab=`A small repair project

Our class decided to repair some old display boards instead of buying new ones. At first, we were not [21] whether the damaged corners could be saved. A technician showed us how to [22] the broken pieces with simple tools. She asked us to work in pairs so that one person could hold each board while the other made the repair.

The work took longer than we had [23], but we learned how the boards were built. We also kept a [24] of the materials we used. This helped us compare the cost of repairing the boards with the price of new ones. By the end of the afternoon, six boards were ready for the exhibition. The others still needed paint, so we [25] to finish them the following week. Everyone agreed that the project had been a useful [26] to learn a practical skill.`;
group('Part 5 · Vocabulary in context · Questions 21–26',vocab,[
['Choose the word for gap 21.',['safe','sure','clear','true'],1,'“Not sure whether” expresses uncertainty.'],
['Choose the word for gap 22.',['replace','repeat','reply','return'],0,'They replace broken pieces with sound ones.'],
['Choose the word for gap 23.',['invited','expected','explained','promised'],1,'“Longer than expected” compares the real duration with the estimate.'],
['Choose the word for gap 24.',['record','story','message','notice'],0,'A record is a written account of materials used.'],
['Choose the word for gap 25.',['avoided','refused','arranged','prevented'],2,'“Arranged to finish” means made a plan to complete the work.'],
['Choose the word for gap 26.',['chance','luck','choice','reason'],0,'A “chance to learn” is an opportunity to learn.']]);
const openText=`Working together

Last month, I joined a group of students who were making a guide to our school. I had never taken part [27] a project like this before, so I was a little nervous. We began by deciding what each person would do. My job was to check the pictures and write captions for them.

There were more photographs [28] we could use. We chose the ones that showed useful places clearly. One picture was too dark, so we asked its photographer to take [29] again. Before sharing the guide, we gave it to a new student [30] had only arrived that week. She found two instructions difficult to understand. We changed those sentences because we wanted the guide to be easy [31] read. In the end, I was proud [32] what we had made together.

Write ONE word in each gap.`;
[['in'],['than'],['it'],['who','that'],['to'],['of']].forEach((answers,i)=>parts.push({type:'fill',topic:'b1_reading',section:i===0?'Part 6 · One-word gaps · Questions 27–32':null,context:i===0?openText:null,q:'Complete gap '+(27+i)+'.',text:'___',answers:[answers],explanation:['The expression is “take part in”.','“More … than” is a comparison.','“It” refers to the single picture.','“Who” or “that” introduces information about the student.','“Easy to read” uses the infinitive.','The expression is “proud of”.'][i]}));
root.EnglishB1Exams=[{id:'mini-exam:en-4',title:'B1 · Reading · 32 questions',durationMin:45,description:'Six parts following the Cambridge B1 Preliminary reading format, with original texts about everyday life and design. Answer all 32 questions. This practice score is not a Cambridge grade or a complete FHR exam result.',parts},
{id:'mini-exam:en-5',title:'B1 · Writing · 2 tasks',durationMin:45,description:'Write the email in Part 1, then choose the article OR the story in Part 2. Write about 100 words for each answer. These are original B1 tasks. Models and review criteria appear after submission; a teacher must assess the quality of your writing.',parts:[
{type:'free',q:'Part 1 · Email · About 100 words',context:'Your friend Sam writes: “I’m excited about visiting your school exhibition next Saturday. When should I arrive? I can help before it opens — what could I do? I’d also like to see something else nearby afterwards. What do you suggest?” Reply to Sam. Say that you are pleased, answer all three questions and use a friendly opening and ending.',modelAnswer:'Hi Sam,\nI’m really pleased you can come to our exhibition! Please arrive at ten, an hour before we open. We will have time to look around together before the visitors arrive. It would be great if you could help put the labels next to the pictures. You do not need to bring any equipment because we have everything at school. Afterwards, we could visit the small gallery near the station. There is a photography exhibition there, and I think you would enjoy it. Let me know if that sounds good to you.\nSee you on Saturday,\nAlex',explanation:'Review all requested information, a suitable friendly tone, clear organisation and understandable vocabulary and grammar. A different useful suggestion is also valid.'},
{type:'free',q:'Part 2 · Choose ONE: article or story · About 100 words',context:'A · Article for a student magazine: “A place that gives you ideas”. Describe a place where you enjoy spending time. Explain what you notice there and why you would recommend it to another student. Give your article a title.\n\nOR\n\nB · Story: Begin with this sentence: “When I opened the box, I knew our exhibition would be different.” Continue the story with a clear sequence of events and an ending.\n\nWrite only your chosen answer below and label it A or B.',modelAnswer:'A · Ideas by the river\nMy favourite place to find ideas is the path beside the river. I usually go there after school when I need a break from my screen. There is always something new to notice, from reflections on the water to the shapes of leaves. Last week, the pattern of shadows under a bridge gave me an idea for a poster. You do not need to be good at drawing to enjoy this place. Take a notebook, sit quietly and write down what catches your attention. I recommend it because a short walk often helps me think more clearly.\n\nB · When I opened the box, I knew our exhibition would be different. Inside were photographs of our school from fifty years ago. We had planned to show only our new designs, but the pictures gave me another idea. I called Mia and suggested placing an old photograph beside each new project. At first, she worried that we would not finish in time. We chose five pictures together and wrote short labels. On Saturday, a visitor recognised herself in one of them. She told us about her art class, and we invited her to write down the story. Our exhibition had become a conversation between generations.',explanation:'For A, check description, observations, reasons and a reader-friendly title. For B, keep the opening sentence and develop connected events with an ending. For either choice, review content, purpose, organisation and language. Word count alone does not measure quality.'}]}];
})(window);
