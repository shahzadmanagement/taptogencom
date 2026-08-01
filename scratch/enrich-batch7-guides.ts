import fs from 'fs';

const batch7ToolGuides: Record<string, { howTo: string[]; tips: { title: string; body: string }[] }> = {
  'fantasy-language-generator': {
    howTo: [
      "Select your desired linguistic tone, phonetic style, and syllable complexity for your fantasy dialect.",
      "Input key roots or words you wish to translate into an original fictional language.",
      "Generate vocabulary sets and review pronunciation guides for consistency with your lore.",
      "Copy the generated phrases into your worldbuilding notes or novel manuscript."
    ],
    tips: [
      { title: "Define phonetic roots", body: "Consistent vowel sounds give your fantasy language a cohesive aesthetic identity." },
      { title: "Avoid real-world trademarks", body: "Ensure generated dialect words do not inadvertently mirror protected fantasy franchises." }
    ]
  },
  'fantasy-name-generator': {
    howTo: [
      "Choose character race, alignment, and fantasy genre archetype.",
      "Set length preferences and title prefixes for high-fantasy or dark-fantasy contexts.",
      "Generate custom name batches and evaluate fit within your fictional setting.",
      "Save selected character and kingdom names to your campaign worldbuilding document."
    ],
    tips: [
      { title: "Check setting tone", body: "Match name harshness or elegance with your world's cultural history." },
      { title: "Verify uniqueness", body: "Confirm generated names are distinct from major published fantasy characters." }
    ]
  },
  'farm-name-generator': {
    howTo: [
      "Input farm type, geographical region, and preferred natural or homestead elements.",
      "Select vintage, rustic, modern, or family-oriented branding themes.",
      "Generate agricultural and homestead name ideas and compare branding potential.",
      "Check local business registries and domain availability for your chosen farm name."
    ],
    tips: [
      { title: "Highlight farm heritage", body: "Incorporate local landmarks or crop specializations for memorable farm branding." },
      { title: "Ensure legibility", body: "Choose farm names that look clean on signage, packaging, and digital storefronts." }
    ]
  },
  'glitch-text-generator': {
    howTo: [
      "Type or paste your input text into the glitch formatting workplace.",
      "Adjust the Zalgo corruption intensity from subtle noise to heavy distortion.",
      "Preview the glitch text across light and dark display modes.",
      "Copy the Unicode distorted text directly to your social bio or gaming profile."
    ],
    tips: [
      { title: "Balance readability", body: "Extreme corruption levels can make important text unreadable on mobile screens." },
      { title: "Test destination platform", body: "Some web platforms filter excessive combining Unicode marks." }
    ]
  },
  'ipa-generator': {
    howTo: [
      "Enter English or localized text words into the phonetic transcriber.",
      "Select target dialect standard (General American or Received Pronunciation).",
      "Generate International Phonetic Alphabet (IPA) symbol representations.",
      "Copy the exact IPA transcription into your dictionary or linguistics project."
    ],
    tips: [
      { title: "Verify stress marks", body: "Check primary stress symbol Placement for multi-syllable word accuracy." },
      { title: "Account for dialect variations", body: "Regional accents alter vowel symbol representation in standard IPA." }
    ]
  },
  'italic-text-generator': {
    howTo: [
      "Input standard plain text into the formatting editor.",
      "Choose from Serif Italic, Sans-Serif Italic, or Script Unicode italic variants.",
      "Preview styled italic text in real time.",
      "Copy and paste formatted italics to Instagram captions, X posts, or profile bios."
    ],
    tips: [
      { title: "Use for emphasis", body: "Apply italics selectively to highlight key callouts and titles." },
      { title: "Accessibility check", body: "Screen readers may handle mathematical Unicode symbols differently than standard text." }
    ]
  },
  'last-name-generator': {
    howTo: [
      "Select regional origin, cultural ancestry, or fictional period style.",
      "Set prefix or suffix preferences to pair seamlessly with target first names.",
      "Generate surname options and evaluate cadence and flow.",
      "Incorporate selected surnames into character profiles or creative writing."
    ],
    tips: [
      { title: "Pair rhythmically", body: "Combine short first names with longer surnames for natural syllable cadence." },
      { title: "Respect cultural context", body: "Verify historical accuracy when assigning regional surnames to period fiction." }
    ]
  },
  'lorem-ipsum-generator': {
    howTo: [
      "Choose output format (paragraphs, sentences, or word counts).",
      "Optionally toggle standard Latin Cicero opening text.",
      "Generate placeholder filler text instantly.",
      "Copy mock text into your design wireframes or layout templates."
    ],
    tips: [
      { title: "Match design density", body: "Generate paragraph lengths matching target typography layout blocks." },
      { title: "Replace before launch", body: "Ensure all placeholder text is removed prior to production deployment." }
    ]
  },
  'meta-tag-generator': {
    howTo: [
      "Input target webpage title, meta description, canonical URL, and primary keywords.",
      "Configure Open Graph social media tags and Twitter card preview options.",
      "Generate SEO-compliant HTML meta tag code snippets.",
      "Copy and paste the generated markup into your site's `<head>` section."
    ],
    tips: [
      { title: "Keep titles under 60 chars", body: "Prevent SERP truncation by keeping page title tags concise." },
      { title: "Include primary keyword", body: "Place core target keywords near the beginning of meta titles and descriptions." }
    ]
  },
  'minutes-of-meeting-generator': {
    howTo: [
      "Enter meeting date, attendees, agenda items, and key discussion notes.",
      "Specify actionable decisions, assigned owners, and completion deadlines.",
      "Generate structured, professional meeting minutes documentation.",
      "Export and distribute formal meeting notes to stakeholders."
    ],
    tips: [
      { title: "Focus on action items", body: "Clearly delineate assigned tasks and due dates for team accountability." },
      { title: "Keep summaries concise", body: "Use bullet points to highlight key decisions over verbatim transcripts." }
    ]
  },
  'name-generator': {
    howTo: [
      "Select category focus (person, brand, project, or fantasy concept).",
      "Adjust style controls for modern, classic, short, or punchy outputs.",
      "Generate customized name variations and review immediate options.",
      "Copy chosen name ideas for further availability and trademark checking."
    ],
    tips: [
      { title: "Test out loud", body: "Pronounce generated names aloud to evaluate verbal clarity and recall." },
      { title: "Verify availability", body: "Always check domain and social handle registration before finalizing a name." }
    ]
  },
  'name-pronunciation-generator': {
    howTo: [
      "Type the target name requiring phonetic breakdown into the input field.",
      "Select audio-spelling style or standard IPA phonetic notation.",
      "Generate phonetic pronunciation guides and syllable emphasis markers.",
      "Copy the clear pronunciation guide to email signatures, scripts, or event notes."
    ],
    tips: [
      { title: "Capitalize stressed syllables", body: "Use uppercase letters for stressed syllables (e.g. mah-REE-ah) for quick reading." },
      { title: "Keep audio spellings simple", body: "Use familiar letter combinations so readers grasp correct pronunciation instantly." }
    ]
  },
  'newspaper-name-generator': {
    howTo: [
      "Input target city, regional focus, or publication niche subject.",
      "Select traditional gazette, herald, journal, or digital media naming style.",
      "Generate publication titles and compare brand presence.",
      "Select the ideal newspaper title for your fiction, school paper, or media site."
    ],
    tips: [
      { title: "Anchor with geographic terms", body: "Incorporate city or region names to ground local news publication titles." },
      { title: "Use established masthead terms", body: "Words like Chronicle, Post, and Times provide instant media authority." }
    ]
  },
  'papyrus-generator': {
    howTo: [
      "Enter your desired text in the input workplace.",
      "Select Papyrus font style formatting and aged parchment visual preview.",
      "Generate stylized ancient document copy.",
      "Copy formatted text or take design screenshots for gaming and event flyers."
    ],
    tips: [
      { title: "Use for themed designs", body: "Papyrus text styles fit historical, fantasy, or archaeological event themes." },
      { title: "Maintain high contrast", body: "Ensure background textures don't impede text legibility." }
    ]
  },
  'pet-tag-generator': {
    howTo: [
      "Input pet name, owner phone number, and microchip or medical notes.",
      "Select tag shape, font layout, and concise emergency instructions.",
      "Preview pet ID tag layout for legibility.",
      "Copy or export text specifications for custom tag engraving."
    ],
    tips: [
      { title: "Prioritize phone numbers", body: "Make contact phone numbers large and legible on engraving proofs." },
      { title: "Include reward note", body: "Adding 'REWARD IF FOUND' increases rapid return probability for lost pets." }
    ]
  },
  'pick-a-name-generator': {
    howTo: [
      "Paste your list of candidate names into the selection pool.",
      "Set total random winners or choices required.",
      "Trigger the unbiased random name selection engine.",
      "View and copy the selected winning names for your contest or group."
    ],
    tips: [
      { title: "Deduplicate list", body: "Remove duplicate entries prior to selection to ensure fair odds." },
      { title: "Record selections", body: "Screenshot or copy selected winner lists for transparent contest verification." }
    ]
  },
  'price-tag-generator': {
    howTo: [
      "Enter item name, SKU, price currency, and optional discount details.",
      "Choose tag size, barcode placeholder style, and store branding.",
      "Generate clean price tag layouts ready for retail display.",
      "Print or export price tags for physical store shelving."
    ],
    tips: [
      { title: "Emphasize price clearly", body: "Ensure final sale prices are bolded and larger than product SKUs." },
      { title: "Include currency symbol", body: "Display unambiguous currency symbols ($ / € / £) to avoid customer confusion." }
    ]
  },
  'product-tag-generator': {
    howTo: [
      "Input product title, material composition, care instructions, and brand name.",
      "Select hang-tag style, eco-friendly badge layout, and sizing info.",
      "Generate formatted apparel or retail product tag specifications.",
      "Export tag text for commercial manufacturing and printing."
    ],
    tips: [
      { title: "Include care icons", body: "Use clear washing and care symbols alongside text instructions." },
      { title: "Highlight key features", body: "Add short 3-word value callouts like '100% Organic Cotton'." }
    ]
  },
  'random-number-generator': {
    howTo: [
      "Set minimum and maximum numeric range boundaries.",
      "Specify total quantity of random numbers to generate.",
      "Toggle unique non-repeating number constraints if required.",
      "Generate random number sets for raffles, stats, or research."
    ],
    tips: [
      { title: "Enable unique mode", body: "Turn on non-repeating mode when drawing raffle tickets or lottery picks." },
      { title: "Sort results", body: "Sort numeric output ascendingly for easier tracking in data spreadsheets." }
    ]
  },
  'reverse-text-generator': {
    howTo: [
      "Enter or paste text into the reversal workplace.",
      "Select character reversal, word reversal, or line order flip mode.",
      "Instantly preview reversed text output.",
      "Copy reversed text for puzzles, social posts, or coding tests."
    ],
    tips: [
      { title: "Check palindrome patterns", body: "Use character reversal to quickly verify palindrome words and sentences." },
      { title: "Preserve line breaks", body: "Keep line break option enabled when reversing multi-line poetry or code." }
    ]
  },
  'robots-txt-generator': {
    howTo: [
      "Configure User-agent rules (Googlebot, Bingbot, all crawlers).",
      "Set Disallow paths for private admin or search result URLs.",
      "Add XML Sitemap index URL location declaration.",
      "Generate and copy the production-ready `robots.txt` file."
    ],
    tips: [
      { title: "Do not block CSS/JS", body: "Allow crawlers access to asset files so Google can render pages properly." },
      { title: "Test before deploying", body: "Validate directives in Google Search Console URL Inspection Tool before publishing." }
    ]
  },
  'serif-generator': {
    howTo: [
      "Type plain text into the serif typography converter.",
      "Select Regular Serif, Bold Serif, or Italic Serif Unicode styles.",
      "Preview stylized serif font output.",
      "Copy Unicode serif text to social media bios, headers, or posts."
    ],
    tips: [
      { title: "Ideal for headlines", body: "Serif Unicode styles lend a classic, editorial feel to short social media titles." },
      { title: "Avoid body paragraphs", body: "Use standard text for body copy to ensure optimal mobile screen legibility." }
    ]
  },
  'small-text-generator': {
    howTo: [
      "Type standard text into the size converter field.",
      "Select superscript, subscript, or small caps Unicode variations.",
      "Preview tiny text output in real time.",
      "Copy small text to social captions, profile titles, or gaming tags."
    ],
    tips: [
      { title: "Use for trademarks", body: "Superscript small text is ideal for ™ and ® symbol placements." },
      { title: "Keep it brief", body: "Small caps are best suited for short 1-3 word phrases and labels." }
    ]
  },
  'strikethrough-text-generator': {
    howTo: [
      "Enter text requiring strikethrough styling.",
      "Select single line strikethrough, double line, or slash line Unicode styles.",
      "Preview formatted strikethrough text instantly.",
      "Copy strikethrough text for to-do list updates, discount edits, or social humor."
    ],
    tips: [
      { title: "Great for price drops", body: "Cross out original prices to highlight sale prices visually in social posts." },
      { title: "Use for completed tasks", body: "Strikethrough text provides clear visual closure for completed task lists." }
    ]
  },
  'superhero-name-generator': {
    howTo: [
      "Select superhero power type, gender, and origin story tone.",
      "Set preference for classic comic book or modern cinematic naming styles.",
      "Generate heroic alter-ego name batches.",
      "Select names for comic scripts, RPG heroes, or gaming personas."
    ],
    tips: [
      { title: "Incorporate power elements", body: "Use terms matching hero capabilities (e.g. Apex, Nova, Titan, Vortex)." },
      { title: "Check comic trademarks", body: "Confirm hero names are distinct from established Marvel or DC properties." }
    ]
  },
  'tag-team-name-generator': {
    howTo: [
      "Input team member names, wrestling style, or duo characteristics.",
      "Select intimidating, comical, or high-flying team theme options.",
      "Generate tag team name ideas.",
      "Choose the perfect team name for sports entertainment or gaming tournaments."
    ],
    tips: [
      { title: "Combine member traits", body: "Blend distinct wrestler traits or names to create a unified team moniker." },
      { title: "Ensure chantability", body: "Pick names with rhythmic cadence that crowd audiences can chant easily." }
    ]
  },
  'team-name-generator': {
    howTo: [
      "Input industry, sport, or group activity focus.",
      "Select professional, fierce, humorous, or minimalist naming styles.",
      "Generate team and department name variations.",
      "Select names for work projects, hackathons, or sports leagues."
    ],
    tips: [
      { title: "Boost team morale", body: "Choose inspiring, inclusive names that foster shared pride and identity." },
      { title: "Keep it professional", body: "Ensure corporate team names align with workplace culture standards." }
    ]
  },
  'text-case-converter': {
    howTo: [
      "Paste text content into the case transformation editor.",
      "Click desired conversion option: UPPERCASE, lowercase, Title Case, camelCase, or kebab-case.",
      "Review transformed text output in real time.",
      "Copy converted text for coding, spreadsheet data, or editorial copy."
    ],
    tips: [
      { title: "Use Title Case for headlines", body: "Title Case ensures consistent headline capitalization in blog posts." },
      { title: "Use kebab-case for URLs", body: "Convert title strings to lowercase hyphenated kebab-case for clean web slugs." }
    ]
  },
  'title-name-generator': {
    howTo: [
      "Input core subject topic, target audience, and content format (book, blog, video).",
      "Select catchy, intrigue-based, how-to, or SEO headline formulas.",
      "Generate headline and title suggestions.",
      "Select titles that maximize search click-through rate and user interest."
    ],
    tips: [
      { title: "Include power words", body: "Words like Ultimate, Essential, and Proven increase headline CTR." },
      { title: "Match search intent", body: "Ensure title promises match actual content delivered on the page." }
    ]
  },
  'unicode-text-generator': {
    howTo: [
      "Type or paste text into the Unicode font transformer.",
      "Browse styled fonts: Gothic, Script, Monospace, Double-Struck, and Bubble text.",
      "Preview stylized text across device displays.",
      "Copy Unicode text for social media bios, comments, and profile titles."
    ],
    tips: [
      { title: "Check device support", body: "Most modern devices render standard Unicode symbols seamlessly." },
      { title: "Use for key callouts", body: "Apply fancy Unicode styles to short titles rather than full body text." }
    ]
  },
  'vaporwave-text-generator': {
    howTo: [
      "Enter text into the vaporwave aesthetic generator.",
      "Select full-width Japanese-style spacing or aesthetic text formatting.",
      "Preview wide ＡＥＳＴＨＥＴＩＣ text in real time.",
      "Copy vaporwave text to music titles, social media posts, or retro designs."
    ],
    tips: [
      { title: "Perfect for retro synthwave", body: "Wide-spaced text complements 80s aesthetic graphics and music titles." },
      { title: "Use all caps for impact", body: "UPPERCASE full-width characters create the strongest vaporwave aesthetic." }
    ]
  },
  'villain-name-generator': {
    howTo: [
      "Select villain archetype (dark lord, mastermind, sci-fi tyrant, or trickster).",
      "Set menacing tone, title prefixes (Lord, Doctor, Darth), and length.",
      "Generate antagonist name batches.",
      "Select menacing names for story villains, campaign bosses, or gaming tags."
    ],
    tips: [
      { title: "Use harsh consonants", body: "Sounds like K, Z, V, and X evoke natural villainous presence." },
      { title: "Add descriptive titles", body: "Combine names with titles (e.g. 'Malakor the Undying') for gravitas." }
    ]
  },
  'warrior-name-generator': {
    howTo: [
      "Select warrior clan heritage (Viking, Knight, Samurai, Spartan, or Gladiator).",
      "Set battle style and honor title preferences.",
      "Generate fierce warrior name options.",
      "Select names for RPG combatants, gaming avatars, or fiction characters."
    ],
    tips: [
      { title: "Reflect combat specialty", body: "Incorporate weapons or battle honors (e.g. Ironclad, Shieldbreaker)." },
      { title: "Match historical era", body: "Align warrior naming conventions with the historical or fantasy setting." }
    ]
  },
  'word-counter': {
    howTo: [
      "Type or paste document text into the real-time text counter.",
      "View instant metrics: total word count, character count (with/without spaces), and reading time.",
      "Inspect keyword density frequencies and sentence statistics.",
      "Adjust text content to meet target assignment, essay, or SEO length limits."
    ],
    tips: [
      { title: "Track reading time", body: "Average reading speed is 200-250 words per minute for timing articles." },
      { title: "Optimize metadata length", body: "Keep meta descriptions between 120-160 characters for SERP display." }
    ]
  }
};

async function enrichBatch7Guides() {
  const filePath = 'src/data/tool-page-data.ts';
  let content = fs.readFileSync(filePath, 'utf-8');

  // Insert batch7ToolGuides into premiumGuideCopy before exported getEffectiveGuideCopy
  const insertMarker = 'export function getEffectiveGuideCopy(';
  const guideCode = `const batch7CustomGuides: Record<string, { howTo: string[]; tips: { title: string; body: string }[] }> = ${JSON.stringify(batch7ToolGuides, null, 2)};\n\n`;

  content = content.replace('return premiumGuideCopy[tool.slug] ?? (batch7GuideSlugs.has(tool.slug) ? batch7GuideCopyFor(tool) : null);', 'return premiumGuideCopy[tool.slug] ?? batch7CustomGuides[tool.slug] ?? (batch7GuideSlugs.has(tool.slug) ? batch7GuideCopyFor(tool) : null);');

  content = content.replace(insertMarker, guideCode + insertMarker);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Successfully injected custom How-To and Tip guides for all 34 Batch 7 tools into tool-page-data.ts');
}

enrichBatch7Guides().catch(console.error);
