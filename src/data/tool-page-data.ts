import type { Tool } from './tools';

const pass28NameControls = { modeId: 'pass28-style', modeLabel: 'Idea Type', modes: [{ value: 'all', label: 'All Ideas' }, { value: 'original-names', label: 'Original Names' }, { value: 'world-style', label: 'World Style' }, { value: 'handle-style', label: 'Handle Style' }, { value: 'lore-card', label: 'Lore Card' }, { value: 'safety-note', label: 'Safety Note' }] };
const pass28TextControls = { modeId: 'pass28-style', modeLabel: 'Text Type', modes: [{ value: 'all', label: 'All Text' }, { value: 'dialogue', label: 'Dialogue' }, { value: 'status-text', label: 'Status Text' }, { value: 'lore-card', label: 'Lore Card' }, { value: 'caption', label: 'Caption' }, { value: 'safety-note', label: 'Safety Note' }] };
const pass28PromptControls = { modeId: 'pass28-style', modeLabel: 'Image Prompt Section', modes: [{ value: 'all', label: 'All Sections' }, { value: 'final-prompt', label: 'Final Prompt' }, { value: 'prompt-breakdown', label: 'Prompt Breakdown' }, { value: 'style-composition-notes', label: 'Style & Composition' }, { value: 'negative-prompt-avoid-list', label: 'Avoid List' }, { value: 'rights-originality-checklist', label: 'Rights Checklist' }, { value: 'safety-review-checklist', label: 'Safety Review' }, { value: 'model-platform-limits', label: 'Model Limits' }] };
const pass28TemplateControls = { modeId: 'pass28-style', modeLabel: 'Template Section', modes: [{ value: 'all', label: 'All Sections' }, { value: 'overview', label: 'Overview' }, { value: 'scope', label: 'Scope' }, { value: 'terms', label: 'Terms' }, { value: 'review-note', label: 'Review Note' }, { value: 'safety-note', label: 'Safety Note' }] };
const pass29SocialControls = { modeId: 'pass29-style', modeLabel: 'Draft Group', modes: [{ value: 'all', label: 'All Groups' }, { value: 'core-tags', label: 'Core Tags' }, { value: 'niche-tags', label: 'Niche Tags' }, { value: 'caption-support', label: 'Caption Support' }, { value: 'review-checklist', label: 'Review Checklist' }, { value: 'safety-note', label: 'Safety Note' }] };
const pass29SecretControls = { modeId: 'pass29-style', modeLabel: 'Output Format', modes: [{ value: 'all', label: 'All Formats' }, { value: 'sample-values', label: 'Sample Values' }, { value: 'formatted', label: 'Formatted' }, { value: 'strength-notes', label: 'Strength Notes' }, { value: 'storage-note', label: 'Storage Note' }, { value: 'safety-note', label: 'Safety Note' }], countId: 'pass29-count', countDefault: 5, countMin: 1, countMax: 12 };
const pass29TemplateControls = { modeId: 'pass29-style', modeLabel: 'Template Section', modes: [{ value: 'all', label: 'All Sections' }, { value: 'overview', label: 'Overview' }, { value: 'scope', label: 'Scope' }, { value: 'terms', label: 'Terms' }, { value: 'review-note', label: 'Review Note' }, { value: 'safety-note', label: 'Safety Note' }] };
const pass29HumorControls = { modeId: 'pass29-style', modeLabel: 'Output Section', modes: [{ value: 'all', label: 'All Sections' }, { value: 'classic-theatrical-insults', label: 'Stage Lines' }, { value: 'calm-comeback', label: 'Calm Comeback' }, { value: 'witty-comeback', label: 'Witty Comeback' }, { value: 'boundary-setting-reply', label: 'Boundary Reply' }, { value: 'de-escalation-reply', label: 'De-escalation' }, { value: 'light-roast', label: 'Light Roast' }, { value: 'playful-roast', label: 'Playful Roast' }, { value: 'clean-roast', label: 'Clean Roast' }, { value: 'softer', label: 'Softer Versions' }, { value: 'avoid', label: 'Avoid / Boundaries' }, { value: 'safety-checklist', label: 'Safety Checklist' }] };
const pass29MarketplaceControls = { modeId: 'pass29-style', modeLabel: 'Listing Section', modes: [{ value: 'all', label: 'All Sections' }, { value: 'core-tags', label: 'Core Tags' }, { value: 'listing-copy', label: 'Listing Copy' }, { value: 'truth-check', label: 'Truth Check' }, { value: 'review-checklist', label: 'Review Checklist' }, { value: 'safety-note', label: 'Safety Note' }] };

export const pass20ControlMap: Record<string, { modeId: string; modeLabel: string; modes: { value: string; label: string }[]; toneId?: string; countId?: string; countDefault?: number; countMin?: number; countMax?: number }> = {
  'dnd-name-generator': { modeId: 'pass19-style', modeLabel: 'Character Type', modes: [{ value: 'all', label: 'All Groups' }, { value: 'human', label: 'Human' }, { value: 'elf', label: 'Elf' }, { value: 'dwarf', label: 'Dwarf' }, { value: 'tiefling', label: 'Tiefling' }, { value: 'dragonborn', label: 'Dragonborn' }, { value: 'party-name', label: 'Party Name' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'wrestling-name-generator': { modeId: 'pass19-style', modeLabel: 'Ring Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'powerhouse', label: 'Powerhouse' }, { value: 'high-flyer', label: 'High-Flyer' }, { value: 'villain', label: 'Villain' }, { value: 'hero', label: 'Hero' }, { value: 'tag-team', label: 'Tag Team' }, { value: 'entrance', label: 'Entrance' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'school-name-generator': { modeId: 'pass19-style', modeLabel: 'School Type', modes: [{ value: 'all', label: 'All Groups' }, { value: 'elementary', label: 'Elementary' }, { value: 'high-school', label: 'High School' }, { value: 'academy', label: 'Academy' }, { value: 'magic-school', label: 'Magic School' }, { value: 'sci-fi-school', label: 'Sci-Fi School' }, { value: 'college', label: 'College' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'street-name-generator': { modeId: 'pass19-style', modeLabel: 'Street Type', modes: [{ value: 'all', label: 'All Groups' }, { value: 'residential', label: 'Residential' }, { value: 'urban', label: 'Urban' }, { value: 'historic', label: 'Historic' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'commercial', label: 'Commercial' }, { value: 'scenic', label: 'Scenic' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'magic-name-generator': { modeId: 'pass19-style', modeLabel: 'Magic Type', modes: [{ value: 'all', label: 'All Groups' }, { value: 'spell', label: 'Spell' }, { value: 'potion', label: 'Potion' }, { value: 'artifact', label: 'Artifact' }, { value: 'school', label: 'School' }, { value: 'ritual', label: 'Ritual' }, { value: 'wizard-alias', label: 'Wizard Alias' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'tavern-name-generator': { modeId: 'pass19-style', modeLabel: 'Tavern Type', modes: [{ value: 'all', label: 'All Groups' }, { value: 'cozy-inn', label: 'Cozy Inn' }, { value: 'adventurer', label: 'Adventurer' }, { value: 'seaside', label: 'Seaside' }, { value: 'dark', label: 'Dark' }, { value: 'funny', label: 'Funny' }, { value: 'noble', label: 'Noble' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'dungeon-name-generator': { modeId: 'pass19-style', modeLabel: 'Dungeon Type', modes: [{ value: 'all', label: 'All Groups' }, { value: 'ancient-ruin', label: 'Ancient Ruin' }, { value: 'crypt', label: 'Crypt' }, { value: 'cavern', label: 'Cavern' }, { value: 'fortress', label: 'Fortress' }, { value: 'arcane', label: 'Arcane' }, { value: 'boss-lair', label: 'Boss Lair' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'cat-name-generator': { modeId: 'pass19-style', modeLabel: 'Cat Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'cute', label: 'Cute' }, { value: 'elegant', label: 'Elegant' }, { value: 'funny', label: 'Funny' }, { value: 'color-based', label: 'Color-Based' }, { value: 'mythic', label: 'Mythic' }, { value: 'food', label: 'Food' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'horse-name-generator': { modeId: 'pass19-style', modeLabel: 'Horse Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'stable', label: 'Stable' }, { value: 'racehorse', label: 'Racehorse' }, { value: 'western', label: 'Western' }, { value: 'elegant', label: 'Elegant' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'color-based', label: 'Color-Based' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'snapchat-name-generator': { modeId: 'pass19-style', modeLabel: 'Display Type', modes: [{ value: 'all', label: 'All Groups' }, { value: 'aesthetic', label: 'Aesthetic' }, { value: 'friend-group', label: 'Friend Group' }, { value: 'creator', label: 'Creator' }, { value: 'funny', label: 'Funny' }, { value: 'clean', label: 'Clean' }, { value: 'backup-variants', label: 'Backup Variants' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'passphrase-generator': { modeId: 'pass20-style', modeLabel: 'Passphrase Style', modes: [{ value: 'readable', label: 'Readable' }, { value: 'memorable', label: 'Memorable' }, { value: 'strong', label: 'Strong' }, { value: 'team', label: 'Team-Safe' }], countId: 'pass20-count', countDefault: 5, countMin: 4, countMax: 8 },
  'avatar-name-generator': { modeId: 'pass19-style', modeLabel: 'Avatar Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'gaming', label: 'Gaming' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'sci-fi', label: 'Sci-Fi' }, { value: 'cute', label: 'Cute' }, { value: 'professional', label: 'Professional' }, { value: 'mystery', label: 'Mystery' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'video-game-name-generator': { modeId: 'pass19-style', modeLabel: 'Game Genre', modes: [{ value: 'all', label: 'All Groups' }, { value: 'adventure', label: 'Adventure' }, { value: 'rpg', label: 'RPG' }, { value: 'puzzle', label: 'Puzzle' }, { value: 'cozy', label: 'Cozy' }, { value: 'horror-light', label: 'Horror-Light' }, { value: 'sci-fi', label: 'Sci-Fi' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'gamertag-generator': { modeId: 'pass19-style', modeLabel: 'Gamertag Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'clean', label: 'Clean' }, { value: 'competitive', label: 'Competitive' }, { value: 'cozy', label: 'Cozy' }, { value: 'sci-fi', label: 'Sci-Fi' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'short', label: 'Short' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'name-tag-generator': { modeId: 'pass20-style', modeLabel: 'Badge Type', modes: [{ value: 'event', label: 'Event' }, { value: 'school', label: 'School' }, { value: 'staff', label: 'Staff' }, { value: 'minimal', label: 'Minimal' }] },
  'random-id-generator': { modeId: 'pass20-style', modeLabel: 'ID Format', modes: [{ value: 'prefixed', label: 'Prefixed' }, { value: 'ticket', label: 'Ticket' }, { value: 'compact', label: 'Compact' }, { value: 'standard', label: 'Standard' }], countId: 'pass20-count', countDefault: 12, countMin: 6, countMax: 24 },
  'viking-name-generator': { modeId: 'pass19-style', modeLabel: 'Name Type', modes: [{ value: 'all', label: 'All Groups' }, { value: 'warrior', label: 'Warrior' }, { value: 'seafarer', label: 'Seafarer' }, { value: 'village', label: 'Village' }, { value: 'mythic', label: 'Mythic' }, { value: 'clan', label: 'Clan' }, { value: 'explorer', label: 'Explorer' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'wizard-name-generator': { modeId: 'pass19-style', modeLabel: 'Wizard Type', modes: [{ value: 'all', label: 'All Groups' }, { value: 'arcane', label: 'Arcane' }, { value: 'elemental', label: 'Elemental' }, { value: 'court-mage', label: 'Court Mage' }, { value: 'hermit', label: 'Hermit' }, { value: 'dark-mage', label: 'Dark Mage' }, { value: 'apprentice', label: 'Apprentice' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'japanese-name-generator': { modeId: 'pass19-style', modeLabel: 'Name Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'modern', label: 'Modern' }, { value: 'classic', label: 'Classic' }, { value: 'soft', label: 'Soft' }, { value: 'strong', label: 'Strong' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'surname-first', label: 'Surname First' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'korean-name-generator': { modeId: 'pass19-style', modeLabel: 'Name Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'modern', label: 'Modern' }, { value: 'classic', label: 'Classic' }, { value: 'soft', label: 'Soft' }, { value: 'strong', label: 'Strong' }, { value: 'stage-friendly', label: 'Stage-Friendly' }, { value: 'surname-first', label: 'Surname First' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'city-name-generator': { modeId: 'pass19-style', modeLabel: 'City Type', modes: [{ value: 'all', label: 'All Groups' }, { value: 'modern', label: 'Modern' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'coastal', label: 'Coastal' }, { value: 'industrial', label: 'Industrial' }, { value: 'sci-fi', label: 'Sci-Fi' }, { value: 'historic', label: 'Historic' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'performer-names-generator': { modeId: 'pass19-style', modeLabel: 'Performer Type', modes: [{ value: 'all', label: 'All Groups' }, { value: 'stage', label: 'Stage' }, { value: 'singer', label: 'Singer' }, { value: 'comedy', label: 'Comedy' }, { value: 'speaker', label: 'Speaker' }, { value: 'mystery', label: 'Mystery' }, { value: 'elegant', label: 'Elegant' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'disc-jockey-names-generator': { modeId: 'pass19-style', modeLabel: 'DJ Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'club', label: 'Club' }, { value: 'electronic', label: 'Electronic' }, { value: 'house', label: 'House' }, { value: 'hip-hop', label: 'Hip-Hop' }, { value: 'wedding', label: 'Wedding' }, { value: 'experimental', label: 'Experimental' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'breadcrumb-generator': { modeId: 'pass20-style', modeLabel: 'Output Format', modes: [{ value: 'all', label: 'All Sections' }, { value: 'html', label: 'HTML' }, { value: 'schema', label: 'Schema JSON-LD' }, { value: 'css', label: 'CSS' }] },
  'rap-name-generator': { modeId: 'pass19-style', modeLabel: 'Rap Name Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'lyrical', label: 'Lyrical' }, { value: 'street-safe', label: 'Street-Safe' }, { value: 'clean', label: 'Clean' }, { value: 'punchy', label: 'Punchy' }, { value: 'poetic', label: 'Poetic' }, { value: 'stage-name', label: 'Stage Name' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'nickname-generator': { modeId: 'pass19-style', modeLabel: 'Nickname Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'cute', label: 'Cute' }, { value: 'cool', label: 'Cool' }, { value: 'short', label: 'Short' }, { value: 'funny', label: 'Funny' }, { value: 'professional', label: 'Professional' }, { value: 'username-friendly', label: 'Username-Friendly' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'villain-name-generator': { modeId: 'pass19-style', modeLabel: 'Villain Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'dark-elegant', label: 'Dark Elegant' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'sci-fi', label: 'Sci-Fi' }, { value: 'mastermind', label: 'Mastermind' }, { value: 'antihero', label: 'Antihero' }, { value: 'comic-style', label: 'Comic-Style' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'college-name-generator': { modeId: 'pass19-style', modeLabel: 'Institution Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'classic', label: 'Classic' }, { value: 'modern', label: 'Modern' }, { value: 'regional-inspired', label: 'Regional-Inspired' }, { value: 'prestigious', label: 'Prestigious' }, { value: 'campus-style', label: 'Campus-Style' }, { value: 'community', label: 'Community' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'sibling-name-generator': { modeId: 'pass19-style', modeLabel: 'Sibling Set Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'modern', label: 'Modern' }, { value: 'classic', label: 'Classic' }, { value: 'matching', label: 'Matching' }, { value: 'unique', label: 'Unique' }, { value: 'soft', label: 'Soft' }, { value: 'strong', label: 'Strong' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'tag-team-name-generator': { modeId: 'pass19-style', modeLabel: 'Team Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'sports', label: 'Sports' }, { value: 'wrestling-inspired', label: 'Wrestling-Inspired' }, { value: 'comedy', label: 'Comedy' }, { value: 'heroic', label: 'Heroic' }, { value: 'competitive', label: 'Competitive' }, { value: 'event-team', label: 'Event-Team' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'warrior-name-generator': { modeId: 'pass19-style', modeLabel: 'Warrior Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'ancient', label: 'Ancient' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'clan', label: 'Clan' }, { value: 'elemental', label: 'Elemental' }, { value: 'heroic', label: 'Heroic' }, { value: 'rugged', label: 'Rugged' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'project-name-generator-keywords': { modeId: 'pass19-style', modeLabel: 'Project Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'keyword-aware', label: 'Keyword-Aware' }, { value: 'internal-codenames', label: 'Internal Codenames' }, { value: 'startup', label: 'Startup' }, { value: 'creative', label: 'Creative' }, { value: 'technical', label: 'Technical' }, { value: 'research', label: 'Research' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'last-name-and-first-name-generator': { modeId: 'pass19-style', modeLabel: 'Full Name Format', modes: [{ value: 'all', label: 'All Groups' }, { value: 'full-name', label: 'Full Name' }, { value: 'directory-style', label: 'Directory Style' }, { value: 'formal', label: 'Formal' }, { value: 'informal', label: 'Informal' }, { value: 'initials', label: 'Initials' }, { value: 'display-name', label: 'Display Name' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'baby-name-generator-with-last-name': { modeId: 'pass19-style', modeLabel: 'Baby Name Flow', modes: [{ value: 'all', label: 'All Groups' }, { value: 'flow-rhythm', label: 'Flow/Rhythm' }, { value: 'modern', label: 'Modern' }, { value: 'classic', label: 'Classic' }, { value: 'elegant', label: 'Elegant' }, { value: 'unique', label: 'Unique' }, { value: 'short', label: 'Short' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'nickname-generator-based-on-name': { modeId: 'pass19-style', modeLabel: 'Nickname Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'cute', label: 'Cute' }, { value: 'cool', label: 'Cool' }, { value: 'professional', label: 'Professional' }, { value: 'funny', label: 'Funny' }, { value: 'short', label: 'Short' }, { value: 'initial-based', label: 'Initial-Based' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'mountain-name-generator': { modeId: 'pass19-style', modeLabel: 'Mountain Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'realistic', label: 'Realistic' }, { value: 'ancient', label: 'Ancient' }, { value: 'snowy', label: 'Snowy' }, { value: 'volcanic', label: 'Volcanic' }, { value: 'region-lore', label: 'Region/Lore' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'forest-name-generator': { modeId: 'pass19-style', modeLabel: 'Forest Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'enchanted', label: 'Enchanted' }, { value: 'dark', label: 'Dark' }, { value: 'ancient', label: 'Ancient' }, { value: 'peaceful', label: 'Peaceful' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'lore-notes', label: 'Lore Notes' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'trademark-friendly-name-generator': { modeId: 'pass19-style', modeLabel: 'Brand Name Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'coined', label: 'Coined' }, { value: 'abstract', label: 'Abstract' }, { value: 'suggestive', label: 'Suggestive' }, { value: 'compound', label: 'Compound' }, { value: 'brandable', label: 'Brandable' }, { value: 'screening-notes', label: 'Screening Notes' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'ancient-greek-inspired-name-generator': { modeId: 'pass19-style', modeLabel: 'Inspired Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'heroic', label: 'Heroic' }, { value: 'scholarly', label: 'Scholarly' }, { value: 'mythic', label: 'Mythic' }, { value: 'city-state', label: 'City-State' }, { value: 'poetic', label: 'Poetic' }, { value: 'fictional', label: 'Fictional' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'roman-inspired-character-name-generator': { modeId: 'pass19-style', modeLabel: 'Inspired Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'citizen', label: 'Citizen' }, { value: 'senator', label: 'Senator' }, { value: 'legion', label: 'Legion' }, { value: 'poetic', label: 'Poetic' }, { value: 'family-line', label: 'Family Line' }, { value: 'fictional', label: 'Fictional' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'ancient-egyptian-inspired-name-generator': { modeId: 'pass19-style', modeLabel: 'Inspired Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'royal', label: 'Royal' }, { value: 'scribe', label: 'Scribe' }, { value: 'river', label: 'River' }, { value: 'temple', label: 'Temple' }, { value: 'mythic', label: 'Mythic' }, { value: 'fictional', label: 'Fictional' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'racehorse-name-generator': { modeId: 'pass19-style', modeLabel: 'Racehorse Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'elegant', label: 'Elegant' }, { value: 'fast', label: 'Fast' }, { value: 'lucky', label: 'Lucky' }, { value: 'classic', label: 'Classic' }, { value: 'funny', label: 'Funny' }, { value: 'stable-call', label: 'Stable Call' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'emo-name-generator': { modeId: 'pass19-style', modeLabel: 'Aesthetic Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'poetic', label: 'Poetic' }, { value: 'soft-emo', label: 'Soft Emo' }, { value: 'dark-aesthetic', label: 'Dark Aesthetic' }, { value: 'music-inspired', label: 'Music-Inspired' }, { value: 'username-friendly', label: 'Username-Friendly' }, { value: 'gentle', label: 'Gentle' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'special-character-generator': { modeId: 'pass21-style', modeLabel: 'Symbol Set', modes: [{ value: 'all', label: 'All Sets' }, { value: 'symbols', label: 'Symbols' }, { value: 'separators', label: 'Separators' }, { value: 'username-safe', label: 'Username-Safe' }, { value: 'arrows', label: 'Arrows' }, { value: 'decorative', label: 'Decorative' }] },
  'ascii-text-generator': { modeId: 'pass21-style', modeLabel: 'ASCII Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'block', label: 'Block' }, { value: 'simple', label: 'Simple' }, { value: 'banner', label: 'Banner' }, { value: 'compact', label: 'Compact' }] },
  'old-english-text-generator': { modeId: 'pass21-style', modeLabel: 'Blackletter Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'gothic', label: 'Gothic' }, { value: 'bold-gothic', label: 'Bold Gothic' }, { value: 'mixed', label: 'Mixed' }, { value: 'compatibility', label: 'Compatibility' }] },
  'ao3-tag-generator': { modeId: 'pass21-style', modeLabel: 'Tag Group', modes: [{ value: 'all', label: 'All Groups' }, { value: 'genre', label: 'Genre' }, { value: 'trope', label: 'Trope' }, { value: 'mood', label: 'Mood' }, { value: 'relationship-neutral', label: 'Relationship-Neutral' }, { value: 'warning-safe', label: 'Warning-Safe' }] },
  'serif-generator': { modeId: 'pass21-style', modeLabel: 'Typography Focus', modes: [{ value: 'all', label: 'All Sections' }, { value: 'font-pairings', label: 'Font Pairings' }, { value: 'css-stacks', label: 'CSS Stacks' }, { value: 'use-cases', label: 'Use Cases' }, { value: 'accessibility', label: 'Accessibility' }] },
  'big-text-generator': { modeId: 'pass22-style', modeLabel: 'Big Text Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'block', label: 'Block' }, { value: 'banner', label: 'Banner' }, { value: 'stacked', label: 'Stacked' }, { value: 'outline', label: 'Outline' }] },
  'bubble-text-generator': { modeId: 'pass22-style', modeLabel: 'Bubble Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'circled', label: 'Circled' }, { value: 'filled', label: 'Filled' }, { value: 'soft', label: 'Soft' }, { value: 'mixed', label: 'Mixed' }] },
  'cursive-name-generator': { modeId: 'pass22-style', modeLabel: 'Cursive Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'script', label: 'Script' }, { value: 'bold-script', label: 'Bold Script' }, { value: 'signature', label: 'Signature' }, { value: 'name-card', label: 'Name Card' }] },
  'cute-text-generator': { modeId: 'pass22-style', modeLabel: 'Cute Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'soft', label: 'Soft' }, { value: 'sparkle', label: 'Sparkle' }, { value: 'caption', label: 'Caption' }, { value: 'profile', label: 'Profile' }] },
  'pixel-text-generator': { modeId: 'pass22-style', modeLabel: 'Pixel Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'pixel-box', label: 'Pixel Box' }, { value: 'arcade', label: 'Arcade' }, { value: 'terminal', label: 'Terminal' }, { value: 'compact', label: 'Compact' }] },
  'retro-text-generator': { modeId: 'pass22-style', modeLabel: 'Retro Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'arcade', label: 'Arcade' }, { value: 'poster', label: 'Poster' }, { value: 'vapor', label: 'Vapor' }, { value: 'console', label: 'Console' }] },
  'castle-name-generator': { modeId: 'pass19-style', modeLabel: 'Castle Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'royal', label: 'Royal' }, { value: 'ruined', label: 'Ruined' }, { value: 'mountain', label: 'Mountain' }, { value: 'coastal', label: 'Coastal' }, { value: 'dark-fantasy', label: 'Dark Fantasy' }, { value: 'storybook', label: 'Storybook' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'club-name-generator': { modeId: 'pass19-style', modeLabel: 'Club Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'social', label: 'Social' }, { value: 'creative', label: 'Creative' }, { value: 'professional', label: 'Professional' }, { value: 'nightlife-safe', label: 'Nightlife-Safe' }, { value: 'school', label: 'School' }, { value: 'community', label: 'Community' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'cocktail-name-generator': { modeId: 'pass19-style', modeLabel: 'Drink Name Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'mocktail-friendly', label: 'Mocktail-Friendly' }, { value: 'elegant', label: 'Elegant' }, { value: 'tropical', label: 'Tropical' }, { value: 'sparkling', label: 'Sparkling' }, { value: 'seasonal', label: 'Seasonal' }, { value: 'menu-ready', label: 'Menu-Ready' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'cowboy-name-generator': { modeId: 'pass19-style', modeLabel: 'Western Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'classic-western', label: 'Classic Western' }, { value: 'ranch', label: 'Ranch' }, { value: 'frontier', label: 'Frontier' }, { value: 'friendly', label: 'Friendly' }, { value: 'tall-tale', label: 'Tall Tale' }, { value: 'trail', label: 'Trail' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'dj-name-generator': { modeId: 'pass19-style', modeLabel: 'DJ Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'club', label: 'Club' }, { value: 'electronic', label: 'Electronic' }, { value: 'wedding', label: 'Wedding' }, { value: 'radio', label: 'Radio' }, { value: 'clean-stage', label: 'Clean Stage' }, { value: 'festival', label: 'Festival' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'dog-name-generator': { modeId: 'pass19-style', modeLabel: 'Dog Name Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'cute', label: 'Cute' }, { value: 'classic', label: 'Classic' }, { value: 'food', label: 'Food' }, { value: 'outdoorsy', label: 'Outdoorsy' }, { value: 'tiny', label: 'Tiny' }, { value: 'big-dog', label: 'Big Dog' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'funny-name-generator': { modeId: 'pass19-style', modeLabel: 'Funny Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'silly', label: 'Silly' }, { value: 'wordplay', label: 'Wordplay' }, { value: 'character', label: 'Character' }, { value: 'team-safe', label: 'Team-Safe' }, { value: 'light-rhyme', label: 'Light Rhyme' }, { value: 'nickname', label: 'Nickname' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'pen-name-generator': { modeId: 'pass19-style', modeLabel: 'Pen Name Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'literary', label: 'Literary' }, { value: 'genre-fiction', label: 'Genre Fiction' }, { value: 'mystery', label: 'Mystery' }, { value: 'romance', label: 'Romance' }, { value: 'nonfiction', label: 'Nonfiction' }, { value: 'initials', label: 'Initials' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'pet-name-generator': { modeId: 'pass19-style', modeLabel: 'Pet Name Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'cute', label: 'Cute' }, { value: 'classic', label: 'Classic' }, { value: 'quirky', label: 'Quirky' }, { value: 'color-based', label: 'Color-Based' }, { value: 'small-pet', label: 'Small Pet' }, { value: 'gentle', label: 'Gentle' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'playlist-name-generator': { modeId: 'pass19-style', modeLabel: 'Playlist Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'mood', label: 'Mood' }, { value: 'workout', label: 'Workout' }, { value: 'focus', label: 'Focus' }, { value: 'road-trip', label: 'Road Trip' }, { value: 'party-safe', label: 'Party-Safe' }, { value: 'seasonal', label: 'Seasonal' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'robot-name-generator': { modeId: 'pass19-style', modeLabel: 'Robot Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'friendly', label: 'Friendly' }, { value: 'industrial', label: 'Industrial' }, { value: 'sci-fi', label: 'Sci-Fi' }, { value: 'assistant', label: 'Assistant' }, { value: 'prototype', label: 'Prototype' }, { value: 'comic', label: 'Comic' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'ship-name-generator': { modeId: 'pass19-style', modeLabel: 'Ship Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'naval', label: 'Naval' }, { value: 'merchant', label: 'Merchant' }, { value: 'explorer', label: 'Explorer' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'peaceful', label: 'Peaceful' }, { value: 'stormy', label: 'Stormy' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'spaceship-name-generator': { modeId: 'pass19-style', modeLabel: 'Spaceship Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'explorer', label: 'Explorer' }, { value: 'colony', label: 'Colony' }, { value: 'science', label: 'Science' }, { value: 'freighter', label: 'Freighter' }, { value: 'sleek', label: 'Sleek' }, { value: 'deep-space', label: 'Deep Space' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'sports-team-name-generator': { modeId: 'pass19-style', modeLabel: 'Sports Team Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'school', label: 'School' }, { value: 'rec-league', label: 'Rec League' }, { value: 'competitive', label: 'Competitive' }, { value: 'office', label: 'Office' }, { value: 'youth', label: 'Youth' }, { value: 'mascot', label: 'Mascot' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'victorian-name-generator': { modeId: 'pass19-style', modeLabel: 'Victorian Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'formal', label: 'Formal' }, { value: 'literary', label: 'Literary' }, { value: 'aristocratic', label: 'Aristocratic' }, { value: 'working-class', label: 'Working-Class' }, { value: 'gothic', label: 'Gothic' }, { value: 'calling-card', label: 'Calling Card' }], toneId: 'pass19-tone', countId: 'pass19-count', countDefault: 24, countMin: 20, countMax: 30 },
  'estimate-generator': { modeId: 'pass22-style', modeLabel: 'Estimate Type', modes: [{ value: 'all', label: 'Full Estimate' }, { value: 'service', label: 'Service' }, { value: 'project', label: 'Project' }, { value: 'itemized', label: 'Itemized' }, { value: 'quick', label: 'Quick Draft' }] },
  'proposal-generator': { modeId: 'pass22-style', modeLabel: 'Proposal Type', modes: [{ value: 'all', label: 'Full Proposal' }, { value: 'client', label: 'Client' }, { value: 'internal', label: 'Internal' }, { value: 'creative', label: 'Creative' }, { value: 'technical', label: 'Technical' }] },
  'short-code-generator': { modeId: 'pass22-style', modeLabel: 'Code Style', modes: [{ value: 'all', label: 'All Formats' }, { value: 'promo', label: 'Promo' }, { value: 'ticket', label: 'Ticket' }, { value: 'internal', label: 'Internal' }, { value: 'readable', label: 'Readable' }] },
  'random-number-generator': { modeId: 'pass23-style', modeLabel: 'Number Set', modes: [{ value: 'all', label: 'All Sets' }, { value: 'quick-picks', label: 'Quick Picks' }, { value: 'ranges', label: 'Ranges' }, { value: 'formatted', label: 'Formatted' }, { value: 'decision', label: 'Decision' }] },
  'random-phrase-generator': { modeId: 'pass23-style', modeLabel: 'Phrase Tone', modes: [{ value: 'all', label: 'All Tones' }, { value: 'creative', label: 'Creative' }, { value: 'friendly', label: 'Friendly' }, { value: 'professional', label: 'Professional' }, { value: 'playful', label: 'Playful' }] },
  'random-text-generator': { modeId: 'pass23-style', modeLabel: 'Text Type', modes: [{ value: 'all', label: 'All Text' }, { value: 'short', label: 'Short' }, { value: 'medium', label: 'Medium' }, { value: 'ui-copy', label: 'UI Copy' }, { value: 'placeholder', label: 'Placeholder' }] },
  'gibberish-generator': { modeId: 'pass23-style', modeLabel: 'Gibberish Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'soft', label: 'Soft' }, { value: 'silly', label: 'Silly' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'techy', label: 'Techy' }] },
  'random-question-generator': { modeId: 'pass23-style', modeLabel: 'Question Type', modes: [{ value: 'all', label: 'All Questions' }, { value: 'icebreaker', label: 'Icebreaker' }, { value: 'creative', label: 'Creative' }, { value: 'reflection', label: 'Reflection' }, { value: 'team-safe', label: 'Team-Safe' }] },
  'truth-or-dare-generator': { modeId: 'pass23-style', modeLabel: 'Game Mode', modes: [{ value: 'all', label: 'All Cards' }, { value: 'truth', label: 'Truth' }, { value: 'dare', label: 'Dare' }, { value: 'party-clean', label: 'Party-Clean' }, { value: 'family', label: 'Family' }] },
  'would-you-rather-generator': { modeId: 'pass23-style', modeLabel: 'Prompt Type', modes: [{ value: 'all', label: 'All Prompts' }, { value: 'funny-clean', label: 'Funny Clean' }, { value: 'food', label: 'Food' }, { value: 'creative', label: 'Creative' }, { value: 'team-safe', label: 'Team-Safe' }] },
  'joke-generator': { modeId: 'pass23-style', modeLabel: 'Joke Style', modes: [{ value: 'all', label: 'All Jokes' }, { value: 'one-liners', label: 'One-Liners' }, { value: 'puns', label: 'Puns' }, { value: 'work-safe', label: 'Work-Safe' }, { value: 'kid-friendly', label: 'Kid-Friendly' }] },
  'compliment-generator': { modeId: 'pass23-style', modeLabel: 'Compliment Tone', modes: [{ value: 'all', label: 'All Compliments' }, { value: 'friendly', label: 'Friendly' }, { value: 'professional', label: 'Professional' }, { value: 'creative', label: 'Creative' }, { value: 'encouraging', label: 'Encouraging' }] },
  'random-word-generator': { modeId: 'pass23-style', modeLabel: 'Word Type', modes: [{ value: 'all', label: 'All Words' }, { value: 'common', label: 'Common' }, { value: 'creative', label: 'Creative' }, { value: 'brandable', label: 'Brandable' }, { value: 'writing', label: 'Writing' }] },
  'content-calendar-generator': { modeId: 'pass23-style', modeLabel: 'Calendar Type', modes: [{ value: 'all', label: 'Full Calendar' }, { value: 'social', label: 'Social' }, { value: 'blog', label: 'Blog' }, { value: 'launch', label: 'Launch' }, { value: 'newsletter', label: 'Newsletter' }] },
  'random-address-generator': { modeId: 'pass23-style', modeLabel: 'Address Format', modes: [{ value: 'all', label: 'All Formats' }, { value: 'us-style', label: 'US-Style' }, { value: 'international-style', label: 'International-Style' }, { value: 'csv', label: 'CSV' }, { value: 'json', label: 'JSON' }] },
  'fake-text-generator': { modeId: 'pass23-style', modeLabel: 'Sample Text Type', modes: [{ value: 'all', label: 'All Samples' }, { value: 'profile', label: 'Placeholder Profile' }, { value: 'message', label: 'Demo Message' }, { value: 'document', label: 'Template Draft' }, { value: 'creative', label: 'Writing Practice' }] },
  'pet-tag-generator': { modeId: 'pass23-style', modeLabel: 'Tag Style', modes: [{ value: 'all', label: 'All Layouts' }, { value: 'front-back', label: 'Front/Back' }, { value: 'cute', label: 'Cute' }, { value: 'minimal', label: 'Minimal' }, { value: 'safety', label: 'Safety' }] },
  'dj-tag-generator': { modeId: 'pass23-style', modeLabel: 'DJ Tag Style', modes: [{ value: 'all', label: 'All Tags' }, { value: 'intro', label: 'Intro' }, { value: 'drop', label: 'Drop' }, { value: 'hype-clean', label: 'Hype Clean' }, { value: 'minimal', label: 'Minimal' }] },
  'clan-tag-generator': { modeId: 'pass23-style', modeLabel: 'Clan Tag Style', modes: [{ value: 'all', label: 'All Tags' }, { value: 'competitive', label: 'Competitive' }, { value: 'casual', label: 'Casual' }, { value: 'fantasy', label: 'Fantasy' }, { value: 'gaming', label: 'Gaming' }] },
  'anagram-of-name-generator': { modeId: 'pass23-style', modeLabel: 'Anagram Type', modes: [{ value: 'all', label: 'All Variants' }, { value: 'letter-based', label: 'Letter-Based' }, { value: 'readable', label: 'Readable' }, { value: 'partial', label: 'Partial' }, { value: 'initials', label: 'Initials' }] },
  'phonetic-spelling-of-name-generator': { modeId: 'pass23-style', modeLabel: 'Phonetic Type', modes: [{ value: 'all', label: 'All Guides' }, { value: 'syllables', label: 'Syllables' }, { value: 'stress', label: 'Stress' }, { value: 'plain-english', label: 'Plain-English' }, { value: 'variants', label: 'Variants' }] },
  'name-combination-generator': { modeId: 'pass23-style', modeLabel: 'Blend Mode', modes: [{ value: 'all', label: 'All Blends' }, { value: 'baby', label: 'Baby' }, { value: 'couple', label: 'Couple' }, { value: 'brand', label: 'Brand' }, { value: 'username', label: 'Username' }] },
  'name-pronunciation-generator': { modeId: 'pass23-style', modeLabel: 'Guide Type', modes: [{ value: 'all', label: 'All Guides' }, { value: 'syllables', label: 'Syllables' }, { value: 'similar-sound', label: 'Similar Sound' }, { value: 'intro', label: 'Intro Line' }, { value: 'notes', label: 'Notes' }] },
  'tattoo-name-generator': { modeId: 'pass23-style', modeLabel: 'Tattoo Style', modes: [{ value: 'all', label: 'All Ideas' }, { value: 'script', label: 'Script' }, { value: 'minimal', label: 'Minimal' }, { value: 'placement', label: 'Placement' }, { value: 'symbol-pairing', label: 'Symbol Pairing' }] },
  'typewriter-text-generator': { modeId: 'pass23-style', modeLabel: 'Typewriter Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'classic', label: 'Classic' }, { value: 'letter', label: 'Letter' }, { value: 'label', label: 'Label' }, { value: 'manuscript', label: 'Manuscript' }] },
  'iupac-name-generator': { modeId: 'pass23-style', modeLabel: 'Chemistry Helper', modes: [{ value: 'all', label: 'All Sections' }, { value: 'educational', label: 'Educational' }, { value: 'functional-group', label: 'Functional Group' }, { value: 'examples', label: 'Examples' }, { value: 'disclaimer', label: 'Disclaimer' }] },
  'bold-text-generator': { modeId: 'pass24-style', modeLabel: 'Style Set', modes: [{ value: 'all', label: 'All Styles' }, { value: 'bold-serif', label: 'Bold Serif' }, { value: 'bold-sans', label: 'Bold Sans' }, { value: 'headline', label: 'Headline' }, { value: 'compact', label: 'Compact' }] },
  'glitch-text-generator': { modeId: 'pass24-style', modeLabel: 'Glitch Level', modes: [{ value: 'all', label: 'All Levels' }, { value: 'soft-glitch', label: 'Soft Glitch' }, { value: 'medium-glitch', label: 'Medium Glitch' }, { value: 'heavy-glitch', label: 'Heavy Glitch' }, { value: 'clean-fallback', label: 'Clean Fallback' }] },
  'small-text-generator': { modeId: 'pass24-style', modeLabel: 'Small Text Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'superscript', label: 'Superscript' }, { value: 'small-caps', label: 'Small Caps' }, { value: 'mini-label', label: 'Mini Label' }, { value: 'compact-note', label: 'Compact Note' }] },
  'italic-text-generator': { modeId: 'pass24-style', modeLabel: 'Italic Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'italic-serif', label: 'Italic Serif' }, { value: 'bold-italic', label: 'Bold Italic' }, { value: 'caption', label: 'Caption' }, { value: 'fallback', label: 'Fallback' }] },
  'strikethrough-text-generator': { modeId: 'pass24-style', modeLabel: 'Strike Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'single-strike', label: 'Single Strike' }, { value: 'edit-note', label: 'Edit Note' }, { value: 'caption-strike', label: 'Caption Strike' }, { value: 'plain-fallback', label: 'Plain Fallback' }] },
  'reverse-text-generator': { modeId: 'pass24-style', modeLabel: 'Reverse Mode', modes: [{ value: 'all', label: 'All Modes' }, { value: 'character-reverse', label: 'Character Reverse' }, { value: 'word-reverse', label: 'Word Reverse' }, { value: 'upside-down', label: 'Upside Down' }, { value: 'mirror-note', label: 'Mirror Note' }] },
  'creepy-text-generator': { modeId: 'pass24-style', modeLabel: 'Creepy Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'light-creepy', label: 'Light Creepy' }, { value: 'misty-creepy', label: 'Misty Creepy' }, { value: 'heavy-creepy', label: 'Heavy Creepy' }, { value: 'clean-caption', label: 'Clean Caption' }] },
  'cool-text-generator': { modeId: 'pass24-style', modeLabel: 'Cool Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'bold', label: 'Bold' }, { value: 'squared', label: 'Squared' }, { value: 'fullwidth', label: 'Fullwidth' }, { value: 'mono', label: 'Mono' }] },
  'leet-text-generator': { modeId: 'pass24-style', modeLabel: 'Leet Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'classic-leet', label: 'Classic Leet' }, { value: 'soft-leet', label: 'Soft Leet' }, { value: 'readable-leet', label: 'Readable Leet' }, { value: 'handle-leet', label: 'Handle Leet' }] },
  'lowercase-generator': { modeId: 'pass24-style', modeLabel: 'Lowercase Format', modes: [{ value: 'all', label: 'All Formats' }, { value: 'plain-lowercase', label: 'Plain Lowercase' }, { value: 'sentence-cleanup', label: 'Sentence Cleanup' }, { value: 'slug-format', label: 'Slug Format' }, { value: 'social-caption', label: 'Social Caption' }] },
  'graffiti-text-generator': { modeId: 'pass24-style', modeLabel: 'Graffiti Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'circled-tag', label: 'Circled Tag' }, { value: 'bracket-tag', label: 'Bracket Tag' }, { value: 'block-tag', label: 'Block Tag' }, { value: 'caption-tag', label: 'Caption Tag' }] },
  'papyrus-generator': { modeId: 'pass24-style', modeLabel: 'Papyrus Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'scroll', label: 'Scroll' }, { value: 'tablet', label: 'Tablet' }, { value: 'ceremonial', label: 'Ceremonial' }, { value: 'plain-transcript', label: 'Plain Transcript' }] },
  'fake-name-generator': { modeId: 'pass24-style', modeLabel: 'Sample Name Type', modes: [{ value: 'all', label: 'All Types' }, { value: 'profile-sample', label: 'Profile Sample' }, { value: 'character-card', label: 'Character Card' }, { value: 'form-testing', label: 'Form Testing' }, { value: 'safe-use-note', label: 'Safe Use Note' }] },
  'pin-generator': { modeId: 'pass24-style', modeLabel: 'PIN Format', modes: [{ value: 'all', label: 'All Formats' }, { value: 'four-digit', label: '4 Digit' }, { value: 'six-digit', label: '6 Digit' }, { value: 'spaced-groups', label: 'Spaced Groups' }, { value: 'safety-note', label: 'Safety Note' }] },
  'geo-tag-generator': { modeId: 'pass24-style', modeLabel: 'Geo Tag Format', modes: [{ value: 'all', label: 'All Formats' }, { value: 'hashtags', label: 'Hashtags' }, { value: 'plain-labels', label: 'Plain Labels' }, { value: 'comma-set', label: 'Comma Set' }, { value: 'safe-use-note', label: 'Safe Use Note' }] },
  'art-tag-generator': { modeId: 'pass24-style', modeLabel: 'Art Tag Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'portfolio', label: 'Portfolio' }, { value: 'gallery-labels', label: 'Gallery Labels' }, { value: 'medium-tags', label: 'Medium Tags' }, { value: 'safe-use-note', label: 'Safe Use Note' }] },
  'email-tag-generator': { modeId: 'pass24-style', modeLabel: 'Email Tag Format', modes: [{ value: 'all', label: 'All Formats' }, { value: 'inbox-labels', label: 'Inbox Labels' }, { value: 'plus-addresses', label: 'Plus Addresses' }, { value: 'folder-rules', label: 'Folder Rules' }, { value: 'safe-use-note', label: 'Safe Use Note' }] },
  'twitch-name-generator': { modeId: 'pass24-style', modeLabel: 'Streamer Name Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'clean-streamer', label: 'Clean Streamer' }, { value: 'gaming-channel', label: 'Gaming Channel' }, { value: 'creator-brand', label: 'Creator Brand' }, { value: 'overlay-ready', label: 'Overlay Ready' }] },
  'secret-santa-name-generator': { modeId: 'pass24-style', modeLabel: 'Exchange Format', modes: [{ value: 'all', label: 'All Formats' }, { value: 'draw-list', label: 'Draw List' }, { value: 'gift-notes', label: 'Gift Notes' }, { value: 'privacy-safe', label: 'Privacy Safe' }, { value: 'host-checklist', label: 'Host Checklist' }] },
  'fantasy-language-generator': { modeId: 'pass24-style', modeLabel: 'Language Section', modes: [{ value: 'all', label: 'All Sections' }, { value: 'sound-rules', label: 'Sound Rules' }, { value: 'sample-words', label: 'Sample Words' }, { value: 'naming-patterns', label: 'Naming Patterns' }, { value: 'phrase-examples', label: 'Phrase Examples' }] },
  'team-name-generator-using-keywords': { modeId: 'pass24-style', modeLabel: 'Team Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'competitive', label: 'Competitive' }, { value: 'fun', label: 'Fun' }, { value: 'professional', label: 'Professional' }, { value: 'gaming', label: 'Gaming' }] },
  'underline-text-generator': { modeId: 'pass25-style', modeLabel: 'Underline Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'combining-underline', label: 'Combining Underline' }, { value: 'spaced-underline', label: 'Spaced Underline' }, { value: 'boxed-label', label: 'Boxed Label' }, { value: 'markdown-fallback', label: 'Markdown Fallback' }] },
  'vaporwave-text-generator': { modeId: 'pass25-style', modeLabel: 'Vaporwave Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'fullwidth', label: 'Fullwidth' }, { value: 'spaced-aesthetic', label: 'Spaced Aesthetic' }, { value: 'soft-label', label: 'Soft Label' }, { value: 'katakana-inspired', label: 'Katakana-Inspired' }] },
  'unicode-text-generator': { modeId: 'pass25-style', modeLabel: 'Unicode Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'bold', label: 'Bold' }, { value: 'italic', label: 'Italic' }, { value: 'monospace', label: 'Monospace' }, { value: 'circled', label: 'Circled' }, { value: 'fullwidth', label: 'Fullwidth' }] },
  'uwu-text-generator': { modeId: 'pass25-style', modeLabel: 'Rewrite Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'soft-cute', label: 'Soft Cute' }, { value: 'playful', label: 'Playful' }, { value: 'caption', label: 'Caption' }, { value: 'clean-fallback', label: 'Clean Fallback' }] },
  'wordart-generator': { modeId: 'pass25-style', modeLabel: 'Word Art Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'banner', label: 'Banner' }, { value: 'boxed', label: 'Boxed' }, { value: 'wave', label: 'Wave' }, { value: 'poster', label: 'Poster' }] },
  'brat-text-generator': { modeId: 'pass25-style', modeLabel: 'Attitude Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'confident', label: 'Confident' }, { value: 'minimal', label: 'Minimal' }, { value: 'caption', label: 'Caption' }, { value: 'style-guide', label: 'Style Guide' }] },
  'invisible-text-generator': { modeId: 'pass25-style', modeLabel: 'Invisible Text Type', modes: [{ value: 'all', label: 'All Types' }, { value: 'zero-width', label: 'Zero Width' }, { value: 'blank-space', label: 'Blank Space' }, { value: 'separator', label: 'Separator' }, { value: 'safety-note', label: 'Safety Note' }] },
  'demon-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'orc-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'witch-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'vampire-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'fairy-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'goblin-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'dwarf-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'tiefling-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'angel-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'dragonborn-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'werewolf-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'barbarian-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'dinosaur-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'gnome-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'mermaid-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'monster-name-generator': { modeId: 'pass25-style', modeLabel: 'Fantasy Style', modes: [{ value: 'all', label: 'All Groups' }, { value: 'wild', label: 'Wild' }, { value: 'ancient', label: 'Ancient' }, { value: 'noble', label: 'Noble' }, { value: 'mystic', label: 'Mystic' }, { value: 'clan', label: 'Clan' }] },
  'instagram-bio-generator': { modeId: 'pass26-style', modeLabel: 'Bio Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'creator', label: 'Creator' }, { value: 'business', label: 'Business' }, { value: 'personal', label: 'Personal' }, { value: 'cta', label: 'CTA' }] },
  'instagram-caption-generator': { modeId: 'pass26-style', modeLabel: 'Caption Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'story', label: 'Story' }, { value: 'launch', label: 'Launch' }, { value: 'community', label: 'Community' }, { value: 'short', label: 'Short' }] },
  'facebook-post-generator': { modeId: 'pass26-style', modeLabel: 'Post Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'community', label: 'Community' }, { value: 'announcement', label: 'Announcement' }, { value: 'event', label: 'Event' }, { value: 'friendly', label: 'Friendly' }] },
  'midjourney-prompt-generator': { modeId: 'pass26-style', modeLabel: 'Image Prompt Section', modes: [{ value: 'all', label: 'All Sections' }, { value: 'final-prompt', label: 'Final Prompt' }, { value: 'prompt-breakdown', label: 'Prompt Breakdown' }, { value: 'style-composition-notes', label: 'Style & Composition' }, { value: 'negative-prompt-avoid-list', label: 'Avoid List' }, { value: 'rights-originality-checklist', label: 'Rights Checklist' }, { value: 'safety-review-checklist', label: 'Safety Review' }, { value: 'model-platform-limits', label: 'Model Limits' }] },
  'stable-diffusion-prompt-generator': { modeId: 'pass26-style', modeLabel: 'Image Prompt Section', modes: [{ value: 'all', label: 'All Sections' }, { value: 'final-prompt', label: 'Final Prompt' }, { value: 'prompt-breakdown', label: 'Prompt Breakdown' }, { value: 'style-composition-notes', label: 'Style & Composition' }, { value: 'negative-prompt-avoid-list', label: 'Avoid List' }, { value: 'rights-originality-checklist', label: 'Rights Checklist' }, { value: 'safety-review-checklist', label: 'Safety Review' }, { value: 'model-platform-limits', label: 'Model Limits' }] },
  'coin-flip': { modeId: 'pass26-style', modeLabel: 'Flip Mode', modes: [{ value: 'all', label: 'All Results' }, { value: 'single', label: 'Single' }, { value: 'best-of-three', label: 'Best of Three' }, { value: 'batch', label: 'Batch' }, { value: 'decision-note', label: 'Decision Note' }], countId: 'pass26-count', countDefault: 8, countMin: 1, countMax: 20 },
  'dice-roller': { modeId: 'pass26-style', modeLabel: 'Dice Mode', modes: [{ value: 'all', label: 'All Results' }, { value: 'd6', label: 'D6' }, { value: 'd20', label: 'D20' }, { value: 'pool', label: 'Dice Pool' }, { value: 'summary', label: 'Summary' }], countId: 'pass26-count', countDefault: 6, countMin: 1, countMax: 20 },
  'random-letter-generator': { modeId: 'pass26-style', modeLabel: 'Letter Mode', modes: [{ value: 'all', label: 'All Sets' }, { value: 'uppercase', label: 'Uppercase' }, { value: 'lowercase', label: 'Lowercase' }, { value: 'vowels', label: 'Vowels' }, { value: 'consonants', label: 'Consonants' }], countId: 'pass26-count', countDefault: 12, countMin: 1, countMax: 40 },
  'random-emoji-generator': { modeId: 'pass26-style', modeLabel: 'Emoji Mode', modes: [{ value: 'all', label: 'All Sets' }, { value: 'friendly', label: 'Friendly' }, { value: 'nature', label: 'Nature' }, { value: 'objects', label: 'Objects' }, { value: 'symbols', label: 'Symbols' }], countId: 'pass26-count', countDefault: 12, countMin: 1, countMax: 40 },
  'random-country-generator': { modeId: 'pass26-style', modeLabel: 'Country Set', modes: [{ value: 'all', label: 'All Sets' }, { value: 'world', label: 'World' }, { value: 'travel-ideas', label: 'Travel Ideas' }, { value: 'study-list', label: 'Study List' }, { value: 'region-mix', label: 'Region Mix' }], countId: 'pass26-count', countDefault: 8, countMin: 1, countMax: 30 },
  'random-date-generator': { modeId: 'pass26-style', modeLabel: 'Date Mode', modes: [{ value: 'all', label: 'All Sets' }, { value: 'this-year', label: 'This Year' }, { value: 'next-90-days', label: 'Next 90 Days' }, { value: 'weekdays', label: 'Weekdays' }, { value: 'planning', label: 'Planning' }], countId: 'pass26-count', countDefault: 8, countMin: 1, countMax: 30 },
  'random-choice-generator': { modeId: 'pass26-style', modeLabel: 'Choice Mode', modes: [{ value: 'all', label: 'All Results' }, { value: 'winner', label: 'Winner' }, { value: 'ranked', label: 'Ranked' }, { value: 'shortlist', label: 'Shortlist' }, { value: 'decision-note', label: 'Decision Note' }], countId: 'pass26-count', countDefault: 3, countMin: 1, countMax: 20 },
  'random-height-generator': { modeId: 'pass26-style', modeLabel: 'Height Mode', modes: [{ value: 'all', label: 'All Sets' }, { value: 'imperial', label: 'Imperial' }, { value: 'metric', label: 'Metric' }, { value: 'character', label: 'Character' }, { value: 'range-note', label: 'Range Note' }], countId: 'pass26-count', countDefault: 8, countMin: 1, countMax: 30 },
  'random-color-generator': { modeId: 'pass26-style', modeLabel: 'Color Mode', modes: [{ value: 'all', label: 'All Sets' }, { value: 'hex', label: 'HEX' }, { value: 'rgb', label: 'RGB' }, { value: 'palette', label: 'Palette' }, { value: 'usage-note', label: 'Usage Note' }], countId: 'pass26-count', countDefault: 8, countMin: 1, countMax: 24 },
  'wheel-spinner-generator': { modeId: 'pass26-style', modeLabel: 'Spinner Mode', modes: [{ value: 'all', label: 'All Results' }, { value: 'spin-result', label: 'Spin Result' }, { value: 'ranked-spin', label: 'Ranked Spin' }, { value: 'segments', label: 'Segments' }, { value: 'fair-use-note', label: 'Fair Use Note' }], countId: 'pass26-count', countDefault: 5, countMin: 1, countMax: 20 },
  'riddle-generator': { modeId: 'pass26-style', modeLabel: 'Riddle Difficulty', modes: [{ value: 'all', label: 'All Levels' }, { value: 'easy', label: 'Easy' }, { value: 'medium', label: 'Medium' }, { value: 'tricky', label: 'Tricky' }, { value: 'classroom', label: 'Classroom' }] },
  'icebreaker-generator': { modeId: 'pass26-style', modeLabel: 'Icebreaker Type', modes: [{ value: 'all', label: 'All Types' }, { value: 'work', label: 'Work' }, { value: 'classroom', label: 'Classroom' }, { value: 'event', label: 'Event' }, { value: 'team', label: 'Team' }, { value: 'friendly', label: 'Friendly' }] },
  'corporate-speak-generator': { modeId: 'pass26-style', modeLabel: 'Rewrite Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'polished', label: 'Polished' }, { value: 'playful', label: 'Playful' }, { value: 'meeting', label: 'Meeting' }, { value: 'plain-english', label: 'Plain English' }] },
  'giveaway-generator': { modeId: 'pass26-style', modeLabel: 'Giveaway Helper', modes: [{ value: 'all', label: 'All Sections' }, { value: 'draw-plan', label: 'Draw Plan' }, { value: 'winner-list', label: 'Winner List' }, { value: 'announcement', label: 'Announcement' }, { value: 'safety-note', label: 'Safety Note' }], countId: 'pass26-count', countDefault: 3, countMin: 1, countMax: 10 },
  'wifi-name-generator': { modeId: 'pass26-style', modeLabel: 'WiFi Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'funny', label: 'Funny' }, { value: 'clean', label: 'Clean' }, { value: 'geeky', label: 'Geeky' }, { value: 'family-safe', label: 'Family-Safe' }] },
  'sigil-generator': { modeId: 'pass26-style', modeLabel: 'Sigil Style', modes: [{ value: 'all', label: 'All Concepts' }, { value: 'minimal', label: 'Minimal' }, { value: 'crest', label: 'Crest' }, { value: 'geometric', label: 'Geometric' }, { value: 'story-mark', label: 'Story Mark' }] },
  'ransom-note-text-generator': { modeId: 'pass26-style', modeLabel: 'Cutout Style', modes: [{ value: 'all', label: 'All Styles' }, { value: 'cutout', label: 'Cutout' }, { value: 'mixed-case', label: 'Mixed Case' }, { value: 'poster', label: 'Poster' }, { value: 'safety-note', label: 'Safety Note' }] },
  'twitter-bio-generator': { modeId: 'pass27-style', modeLabel: 'Draft Type', modes: [{ value: 'all', label: 'All Drafts' }, { value: 'profile', label: 'Profile' }, { value: 'professional', label: 'Professional' }, { value: 'creator', label: 'Creator' }, { value: 'cta', label: 'CTA' }] },
  'tiktok-bio-generator': { modeId: 'pass27-style', modeLabel: 'Draft Type', modes: [{ value: 'all', label: 'All Drafts' }, { value: 'profile', label: 'Profile' }, { value: 'professional', label: 'Professional' }, { value: 'creator', label: 'Creator' }, { value: 'cta', label: 'CTA' }] },
  'linkedin-bio-generator': { modeId: 'pass27-style', modeLabel: 'Draft Type', modes: [{ value: 'all', label: 'All Drafts' }, { value: 'profile', label: 'Profile' }, { value: 'professional', label: 'Professional' }, { value: 'creator', label: 'Creator' }, { value: 'cta', label: 'CTA' }] },
  'linkedin-headline-generator': { modeId: 'pass27-style', modeLabel: 'Draft Type', modes: [{ value: 'all', label: 'All Drafts' }, { value: 'profile', label: 'Profile' }, { value: 'professional', label: 'Professional' }, { value: 'creator', label: 'Creator' }, { value: 'cta', label: 'CTA' }] },
  'youtube-description-generator': { modeId: 'pass27-style', modeLabel: 'Draft Type', modes: [{ value: 'all', label: 'All Drafts' }, { value: 'overview', label: 'Overview' }, { value: 'chapters', label: 'Chapters' }, { value: 'cta', label: 'CTA' }, { value: 'short', label: 'Short' }] },
  'tiktok-caption-generator': { modeId: 'pass27-style', modeLabel: 'Draft Type', modes: [{ value: 'all', label: 'All Drafts' }, { value: 'overview', label: 'Overview' }, { value: 'chapters', label: 'Chapters' }, { value: 'cta', label: 'CTA' }, { value: 'short', label: 'Short' }] },
  'linkedin-post-generator': { modeId: 'pass27-style', modeLabel: 'Draft Type', modes: [{ value: 'all', label: 'All Drafts' }, { value: 'overview', label: 'Overview' }, { value: 'chapters', label: 'Chapters' }, { value: 'cta', label: 'CTA' }, { value: 'short', label: 'Short' }] },
  'youtube-hook-generator': { modeId: 'pass27-style', modeLabel: 'Responsible Hook Type', modes: [{ value: 'all', label: 'All Responsible Drafts' }, { value: 'overview', label: 'Honest Openers' }, { value: 'chapters', label: 'Intro Structures' }, { value: 'cta', label: 'Viewer Guidance' }, { value: 'short', label: 'Short Intros' }] },
  'linkedin-summary-generator': { modeId: 'pass27-style', modeLabel: 'Draft Type', modes: [{ value: 'all', label: 'All Drafts' }, { value: 'profile', label: 'Profile' }, { value: 'professional', label: 'Professional' }, { value: 'creator', label: 'Creator' }, { value: 'cta', label: 'CTA' }] },
  'youtube-name-generator': { modeId: 'pass27-style', modeLabel: 'Name Type', modes: [{ value: 'all', label: 'All Names' }, { value: 'clean-channel', label: 'Clean Channel' }, { value: 'creator-brand', label: 'Creator Brand' }, { value: 'handle-style', label: 'Handle Style' }, { value: 'safety-note', label: 'Safety Note' }] },
  'tiktok-name-generator': { modeId: 'pass27-style', modeLabel: 'Name Type', modes: [{ value: 'all', label: 'All Names' }, { value: 'clean-channel', label: 'Clean Channel' }, { value: 'creator-brand', label: 'Creator Brand' }, { value: 'handle-style', label: 'Handle Style' }, { value: 'safety-note', label: 'Safety Note' }] },
  'instagram-name-generator': { modeId: 'pass27-style', modeLabel: 'Name Type', modes: [{ value: 'all', label: 'All Names' }, { value: 'clean-channel', label: 'Clean Channel' }, { value: 'creator-brand', label: 'Creator Brand' }, { value: 'handle-style', label: 'Handle Style' }, { value: 'safety-note', label: 'Safety Note' }] },
  'twitter-name-generator': { modeId: 'pass27-style', modeLabel: 'Name Type', modes: [{ value: 'all', label: 'All Names' }, { value: 'clean-channel', label: 'Clean Channel' }, { value: 'creator-brand', label: 'Creator Brand' }, { value: 'handle-style', label: 'Handle Style' }, { value: 'safety-note', label: 'Safety Note' }] },
  'api-key-generator': { modeId: 'pass27-style', modeLabel: 'Sample Type', modes: [{ value: 'all', label: 'All Samples' }, { value: 'sample-key', label: 'Sample Key' }, { value: 'formatted', label: 'Formatted' }, { value: 'checklist', label: 'Checklist' }, { value: 'safety-note', label: 'Safety Note' }], countId: 'pass27-count', countDefault: 4, countMin: 1, countMax: 10 },
  'license-key-generator': { modeId: 'pass27-style', modeLabel: 'Sample Type', modes: [{ value: 'all', label: 'All Samples' }, { value: 'sample-key', label: 'Sample Key' }, { value: 'formatted', label: 'Formatted' }, { value: 'checklist', label: 'Checklist' }, { value: 'safety-note', label: 'Safety Note' }], countId: 'pass27-count', countDefault: 4, countMin: 1, countMax: 10 },
  'recovery-code-generator': { modeId: 'pass27-style', modeLabel: 'Sample Type', modes: [{ value: 'all', label: 'All Samples' }, { value: 'sample-key', label: 'Sample Key' }, { value: 'formatted', label: 'Formatted' }, { value: 'checklist', label: 'Checklist' }, { value: 'safety-note', label: 'Safety Note' }], countId: 'pass27-count', countDefault: 6, countMin: 1, countMax: 12 },
  'jwt-generator': { modeId: 'pass27-style', modeLabel: 'Sample Type', modes: [{ value: 'all', label: 'All Samples' }, { value: 'sample-key', label: 'Sample JWT' }, { value: 'formatted', label: 'Decoded Parts' }, { value: 'checklist', label: 'Checklist' }, { value: 'safety-note', label: 'Safety Note' }] },
  'invoice-generator': { modeId: 'pass27-style', modeLabel: 'Document Type', modes: [{ value: 'all', label: 'All Sections' }, { value: 'draft', label: 'Draft' }, { value: 'line-items', label: 'Line Items' }, { value: 'message', label: 'Message' }, { value: 'safety-note', label: 'Safety Note' }] },
  'receipt-generator': { modeId: 'pass27-style', modeLabel: 'Document Type', modes: [{ value: 'all', label: 'All Sections' }, { value: 'draft', label: 'Draft' }, { value: 'line-items', label: 'Line Items' }, { value: 'message', label: 'Message' }, { value: 'safety-note', label: 'Safety Note' }] },
  'meeting-agenda-generator': { modeId: 'pass27-style', modeLabel: 'Document Type', modes: [{ value: 'all', label: 'All Sections' }, { value: 'draft', label: 'Draft' }, { value: 'line-items', label: 'Line Items' }, { value: 'message', label: 'Message' }, { value: 'safety-note', label: 'Safety Note' }] },
  'amazon-listing-generator': { modeId: 'pass27-style', modeLabel: 'Listing Type', modes: [{ value: 'all', label: 'All Sections' }, { value: 'draft', label: 'Draft' }, { value: 'line-items', label: 'Bullets' }, { value: 'message', label: 'Description' }, { value: 'safety-note', label: 'Safety Note' }] },
  'etsy-listing-generator': { modeId: 'pass27-style', modeLabel: 'Listing Type', modes: [{ value: 'all', label: 'All Sections' }, { value: 'draft', label: 'Draft' }, { value: 'line-items', label: 'Bullets' }, { value: 'message', label: 'Description' }, { value: 'safety-note', label: 'Safety Note' }] },
  'dalle-prompt-generator': pass28PromptControls,
  'acceptable-use-policy-generator': pass28TemplateControls,
  'contract-generator': pass28TemplateControls,
  'dmca-policy-generator': pass28TemplateControls,
  'purchase-order-generator': pass28TemplateControls,
  'quotation-generator': pass28TemplateControls,
  'youtube-tag-generator': pass29SocialControls,
  'pinterest-tag-generator': pass29SocialControls,
  'soundcloud-tag-generator': pass29SocialControls,
  'twitter-card-generator': pass29SocialControls,
  'password-generator': pass29SecretControls,
  'token-generator': pass29SecretControls,
  'privacy-policy-generator': pass29TemplateControls,
  'terms-generator': pass29TemplateControls,
  'cookie-policy-generator': pass29TemplateControls,
  'disclaimer-generator': pass29TemplateControls,
  'refund-policy-generator': pass29TemplateControls,
  'affiliate-disclosure-generator': pass29TemplateControls,
  'nda-generator': pass29TemplateControls,
  'service-agreement-generator': pass29TemplateControls,
  'shakespeare-insult-generator': pass29HumorControls,
  'comeback-generator': pass29HumorControls,
  'roast-generator': pass29HumorControls,
  'etsy-tag-generator': pass29MarketplaceControls,
  'shopify-product-description-generator': pass29MarketplaceControls};


export const noindexToolSlugs = new Set(['ao3-tag-generator', 'random-address-generator', 'fake-name-generator', 'pin-generator', 'ransom-note-text-generator', 'api-key-generator', 'license-key-generator', 'recovery-code-generator', 'invoice-generator', 'x-post-generator', 'jwt-generator', 'receipt-generator', 'contract-generator', 'dmca-policy-generator', 'password-generator', 'shakespeare-insult-generator', 'comeback-generator', 'privacy-policy-generator', 'terms-generator', 'roast-generator', 'tiktok-username-generator', 'nda-generator', 'service-agreement-generator', 'token-generator', 'shipping-policy-generator', 'acceptable-use-policy-generator', 'return-policy-generator', 'cookie-policy-generator', 'disclaimer-generator', 'refund-policy-generator', 'affiliate-disclosure-generator', 'instagram-bio-generator', 'instagram-caption-generator', 'facebook-post-generator', 'twitter-bio-generator', 'tiktok-bio-generator', 'linkedin-bio-generator', 'youtube-name-generator', 'tiktok-name-generator', 'instagram-name-generator', 'twitter-name-generator', 'linkedin-headline-generator', 'youtube-description-generator', 'tiktok-caption-generator', 'linkedin-post-generator', 'amazon-listing-generator', 'etsy-listing-generator', 'youtube-hook-generator', 'linkedin-summary-generator', 'chatgpt-prompt-generator', 'twitter-card-generator', 'shopify-product-description-generator']);

const brandIpNoindexSlugs = new Set(['ao3-tag-generator']);
const legalTemplateNoindexSlugs = new Set(['shipping-policy-generator', 'acceptable-use-policy-generator', 'contract-generator', 'dmca-policy-generator', 'return-policy-generator', 'privacy-policy-generator', 'terms-generator', 'cookie-policy-generator', 'disclaimer-generator', 'refund-policy-generator', 'affiliate-disclosure-generator', 'nda-generator', 'service-agreement-generator']);
const fakeIdentityNoindexSlugs = new Set(['random-address-generator', 'fake-name-generator', 'invoice-generator', 'receipt-generator']);
const securityNoindexSlugs = new Set(['pin-generator', 'api-key-generator', 'license-key-generator', 'recovery-code-generator', 'jwt-generator', 'password-generator', 'token-generator']);
const humorNoindexSlugs = new Set(['shakespeare-insult-generator', 'comeback-generator', 'roast-generator']);
const threatAdjacentNoindexSlugs = new Set(['ransom-note-text-generator']);
const platformNoindexSlugs = new Set(['instagram-bio-generator', 'instagram-caption-generator', 'facebook-post-generator', 'twitter-bio-generator', 'tiktok-bio-generator', 'linkedin-bio-generator', 'youtube-name-generator', 'tiktok-name-generator', 'instagram-name-generator', 'twitter-name-generator', 'linkedin-headline-generator', 'youtube-description-generator', 'tiktok-caption-generator', 'linkedin-post-generator', 'x-post-generator', 'amazon-listing-generator', 'etsy-listing-generator', 'youtube-hook-generator', 'linkedin-summary-generator', 'chatgpt-prompt-generator', 'twitter-card-generator', 'tiktok-username-generator', 'shopify-product-description-generator']);
const randomUtilityNoindexSlugs = new Set<string>([]);

const noindexSafetyCopy = {
  brand_ip: {
    disclaimer: 'Fan-inspired brainstorming only. This tool is not official, endorsed, affiliated, or connected with any named franchise, brand, platform, publisher, studio, or rights holder. Avoid copying protected characters, official names, logos, lore, or implying availability, ownership, endorsement, or official status.',
    use: 'It is best used for original fan-inspired brainstorming, parody-safe drafts, tabletop ideas, fictional worlds, or personal creative notes.',
    limits: 'It does not grant IP rights, check name availability, verify trademarks, or make anything official.',
    beforeUse: 'Rename or rewrite anything that feels too close to protected characters, official lore, registered marks, platform handles, or recognizable brand assets.'
  },
  legal_template: {
    disclaimer: 'Informational drafting help only, not legal advice. Templates and policy text must be reviewed by a qualified professional for your jurisdiction, business model, actual practices, and current legal requirements before publication or use.',
    use: 'It is best used to organize first-draft sections, check what details you may need to fill in, and prepare notes for professional review.',
    limits: 'It does not create a legally valid agreement, policy, notice, disclosure, or compliance document by itself.',
    beforeUse: 'Verify every clause, date, party name, fee, process, jurisdiction, disclosure, and obligation with a qualified professional before relying on it.'
  },
  fake_identity: {
    disclaimer: 'Fictional and sample-data use only. Do not use generated names, addresses, receipts, invoices, or identity-style details for impersonation, fraud, evasion, fake records, account abuse, official forms, or deceptive claims.',
    use: 'It is best used for mockups, software testing, design placeholders, fictional writing, and privacy-preserving examples.',
    limits: 'It does not verify real people, real addresses, tax details, payment status, purchases, or official records.',
    beforeUse: 'Replace placeholders with truthful, authorized information before sending documents, publishing data, or using anything in a real workflow.'
  },
  security_sensitive: {
    disclaimer: 'Demo and formatting help only. Do not treat generated values as production credentials, real secrets, audited security material, or guaranteed cryptographic output. Use trusted security tools, password managers, and official systems for real access control.',
    use: 'It is best used for UI mockups, documentation examples, placeholder formats, local demos, and test fixtures that do not protect real systems.',
    limits: 'It does not provide a security audit, production suitability guarantee, storage protection, entropy certification, or recovery guarantee.',
    beforeUse: 'For real credentials or tokens, use your approved security process, rotate secrets safely, store them in a trusted manager, and never paste real secrets into demos.'
  },
  platform_abuse: {
    disclaimer: 'Drafting and planning help only. This tool is not affiliated with or endorsed by any named platform or marketplace. Do not use outputs for spam, impersonation, evasion, fake engagement, fake reviews, deceptive claims, scraping abuse, policy bypassing, or unsupported performance promises.',
    use: 'It is best used to brainstorm truthful profile copy, captions, tags, prompts, listing sections, metadata, or post drafts that you will review before publishing.',
    limits: 'It does not guarantee reach, ranking, approval, monetization, availability, search performance, or platform compliance.',
    beforeUse: 'Check the current platform or marketplace rules, remove unsupported claims, avoid copying others, and make sure every statement is truthful for your account, product, or content.'
  },
  humor_abuse: {
    disclaimer: 'Friendly, consensual humor only. Do not use generated lines for harassment, bullying, threats, hate, protected-class targeting, sexual content, doxxing, humiliation, or repeated unwanted contact.',
    use: 'It is best used for light banter, fictional dialogue, party games, improv prompts, or jokes between people who are comfortable with that style.',
    limits: 'It does not judge whether a real person will find a joke acceptable, safe, or welcome.',
    beforeUse: 'Keep it playful, avoid private or sensitive traits, and skip any line that would escalate conflict or target someone unfairly.'
  },
  threat_adjacent: {
    disclaimer: 'Decorative mixed-text styling only. Do not use this tool for threats, extortion, intimidation, harassment, stalking, coercion, criminal framing, or messages meant to frighten a real person.',
    use: 'It is best used for fictional props, Halloween-style graphics, harmless design experiments, or dramatic typography practice.',
    limits: 'It does not make threatening content acceptable, safe, or legal.',
    beforeUse: 'Use fictional wording, avoid real names or contact details, and remove any language that could be read as a real threat or demand.'
  },
  random_utility: {
    disclaimer: 'Low-stakes decision help only. Do not use random outputs for gambling, legal fairness, hiring, medical, financial, security, compliance, prize rules, or any decision that requires audited randomness or accountability.',
    use: 'It is best used for casual picks, classroom games, creative prompts, meal choices, task ordering, or lightweight planning.',
    limits: 'It does not provide audited fairness, cryptographic randomness, legal compliance, or a reliable process for high-stakes decisions.',
    beforeUse: 'For important decisions, use a documented process, confirm the options, and involve the right people before acting.'
  },
  safe_low_risk: {
    disclaimer: 'Creative planning help only. Review outputs for accuracy, suitability, originality, and context before using them publicly.',
    use: 'It is best used for brainstorming, first drafts, internal planning, fictional examples, and creative exploration.',
    limits: 'It does not guarantee availability, originality, accuracy, compliance, or fitness for a specific public use.',
    beforeUse: 'Edit the output for your audience, check names or claims separately, and remove anything that could mislead readers.'
  }
};

function noindexRiskTypeFor(toolSlug: string) {
  if (brandIpNoindexSlugs.has(toolSlug)) return 'brand_ip';
  if (legalTemplateNoindexSlugs.has(toolSlug)) return 'legal_template';
  if (fakeIdentityNoindexSlugs.has(toolSlug)) return 'fake_identity';
  if (securityNoindexSlugs.has(toolSlug)) return 'security_sensitive';
  if (humorNoindexSlugs.has(toolSlug)) return 'humor_abuse';
  if (threatAdjacentNoindexSlugs.has(toolSlug)) return 'threat_adjacent';
  if (platformNoindexSlugs.has(toolSlug)) return 'platform_abuse';
  if (randomUtilityNoindexSlugs.has(toolSlug)) return 'random_utility';
  return 'safe_low_risk';
}


const premiumGuideCopy: Record<string, { howTo: string[]; tips: { title: string; body: string }[] }> = {
  'uwu-text-generator': {
    howTo: [
      "Enter the UwU and OwO style, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for chat, Discord, and playful social posts.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for chat, Discord, and playful social posts rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'vampire-name-generator': {
    howTo: [
      "Enter the vampire character names, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for gothic fiction, horror RPGs, and dark fantasy.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for gothic fiction, horror RPGs, and dark fantasy rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'video-game-name-generator': {
    howTo: [
      "Enter the video game title ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for indie games, jams, prototypes, and pitches.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for indie games, jams, prototypes, and pitches rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'video-prompt-generator': {
    howTo: [
      "Enter the video prompt ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for YouTube, Shorts, Reels, tutorials, and product demos.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for YouTube, Shorts, Reels, tutorials, and product demos rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'viking-name-generator': {
    howTo: [
      "Enter the Viking and Norse-inspired names, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for RPG characters, historical fantasy, and worldbuilding.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for RPG characters, historical fantasy, and worldbuilding rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'wave-generator': {
    howTo: [
      "Enter the CSS and SVG wave dividers, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for landing pages, section breaks, and web mockups.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for landing pages, section breaks, and web mockups rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'werewolf-name-generator': {
    howTo: [
      "Enter the werewolf and lycanthrope names, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for urban fantasy, horror stories, and RPG characters.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for urban fantasy, horror stories, and RPG characters rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'wheel-spinner-generator': {
    howTo: [
      "Enter the random spinner wheels, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for classrooms, giveaways, team choices, and quick decisions.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for classrooms, giveaways, team choices, and quick decisions rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'wifi-name-generator': {
    howTo: [
      "Enter the WiFi network name ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for home routers, guest networks, apartments, and small offices.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for home routers, guest networks, apartments, and small offices rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'witch-name-generator': {
    howTo: [
      "Enter the witch, mage, and coven names, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for fantasy stories, Halloween characters, and RPG campaigns.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for fantasy stories, Halloween characters, and RPG campaigns rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'wizard-name-generator': {
    howTo: [
      "Enter the wizard and mage names, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for fantasy stories, tabletop games, and character sheets.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for fantasy stories, tabletop games, and character sheets rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'wolf-name-generator': {
    howTo: [
      "Enter the wolf and canine names, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for pets, fantasy packs, games, and character lists.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for pets, fantasy packs, games, and character lists rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'wordart-generator': {
    howTo: [
      "Enter the decorative word art text, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for headings, profile lines, comments, and simple messages.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for headings, profile lines, comments, and simple messages rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'worksheet-generator': {
    howTo: [
      "Enter the worksheet templates, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for teachers, tutors, homeschool planning, and study sessions.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for teachers, tutors, homeschool planning, and study sessions rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'worldbuilding-generator': {
    howTo: [
      "Enter the worldbuilding ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for fantasy, sci-fi, RPG, and fiction settings.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for fantasy, sci-fi, RPG, and fiction settings rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'would-you-rather-generator': {
    howTo: [
      "Enter the would-you-rather questions, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for icebreakers, classrooms, parties, and content prompts.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for icebreakers, classrooms, parties, and content prompts rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'wrestling-name-generator': {
    howTo: [
      "Enter the wrestling persona names, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for fictional wrestlers, games, promos, and character concepts.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for fictional wrestlers, games, promos, and character concepts rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'writing-prompt-generator': {
    howTo: [
      "Enter the creative writing prompts, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for fiction writers, students, journaling, and story practice.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for fiction writers, students, journaling, and story practice rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'assignment-generator': {
    howTo: [
      "Enter the assignment brief drafts, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for teachers, trainers, and course planning.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for teachers, trainers, and course planning rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'author-bio-generator': {
    howTo: [
      "Enter the author bio drafts, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for book pages, guest posts, portfolios, and speaker profiles.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for book pages, guest posts, portfolios, and speaker profiles rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'baby-name-generator': {
    howTo: [
      "Enter the baby name ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for expecting parents, family lists, and character naming.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for expecting parents, family lists, and character naming rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'band-name-generator': {
    howTo: [
      "Enter the band and music project names, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for bands, solo projects, playlists, and fictional groups.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for bands, solo projects, playlists, and fictional groups rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'blob-generator': {
    howTo: [
      "Enter the CSS blob shapes, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for hero sections, avatars, badges, and background accents.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for hero sections, avatars, badges, and background accents rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'blog-name-generator': {
    howTo: [
      "Enter the blog name ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for personal sites, niche blogs, newsletters, and editorial projects.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for personal sites, niche blogs, newsletters, and editorial projects rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'blog-outline-generator': {
    howTo: [
      "Enter the blog outline drafts, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for articles, SEO briefs, tutorials, and editorial planning.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for articles, SEO briefs, tutorials, and editorial planning rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'blog-tag-generator': {
    howTo: [
      "Enter the blog tag ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for CMS organization, topic clusters, and editorial workflows.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for CMS organization, topic clusters, and editorial workflows rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'bold-text-generator': {
    howTo: [
      "Enter the bold Unicode text, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for profile lines, short labels, captions, and messages.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for profile lines, short labels, captions, and messages rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'border-radius-generator': {
    howTo: [
      "Enter the CSS border radius values, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for cards, buttons, images, and interface components.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for cards, buttons, images, and interface components rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'box-shadow-generator': {
    howTo: [
      "Enter the CSS box shadows, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for cards, buttons, panels, and UI elevation.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for cards, buttons, panels, and UI elevation rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'brand-kit-generator': {
    howTo: [
      "Enter the brand kit direction, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for small businesses, creators, launches, and mockups.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for small businesses, creators, launches, and mockups rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'cafe-name-generator': {
    howTo: [
      "Enter the cafe name ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for coffee shops, pop-ups, bakery cafes, and fictional venues.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for coffee shops, pop-ups, bakery cafes, and fictional venues rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'cake-company-names-generator': {
    howTo: [
      "Enter the cake business name ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for bakeries, custom cake studios, dessert shops, and events.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for bakeries, custom cake studios, dessert shops, and events rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'canonical-tag-generator': {
    howTo: [
      "Enter the canonical tag drafts, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for SEO checks, duplicate URL cleanup, and page templates.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for SEO checks, duplicate URL cleanup, and page templates rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'character-prompt-generator': {
    howTo: [
      "Enter the character prompt ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for fiction, roleplay, art briefs, and worldbuilding.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for fiction, roleplay, art briefs, and worldbuilding rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'clan-name-generator': {
    howTo: [
      "Enter the clan and guild names, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for gaming teams, RPG factions, and community groups.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for gaming teams, RPG factions, and community groups rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'clan-tag-generator': {
    howTo: [
      "Enter the short clan tags, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for gaming teams, guilds, squads, and community handles.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for gaming teams, guilds, squads, and community handles rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'clothing-tag-generator': {
    howTo: [
      "Enter the clothing tag copy, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for apparel brands, product mockups, and care labels.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for apparel brands, product mockups, and care labels rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'coffee-shop-name-generator': {
    howTo: [
      "Enter the coffee shop name ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for cafes, roasters, carts, and fictional venues.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for cafes, roasters, carts, and fictional venues rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'cold-email-generator': {
    howTo: [
      "Enter the cold email drafts, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for outreach, partnerships, sales, and recruiting messages.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for outreach, partnerships, sales, and recruiting messages rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'color-name-generator': {
    howTo: [
      "Enter the color name ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for palettes, products, design systems, and creative briefs.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for palettes, products, design systems, and creative briefs rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'content-brief-generator': {
    howTo: [
      "Enter the content brief drafts, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for SEO articles, editorial assignments, and content planning.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for SEO articles, editorial assignments, and content planning rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'cover-letter-generator': {
    howTo: [
      "Enter the cover letter drafts, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for job applications and career transitions.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for job applications and career transitions rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'cron-expression-generator': {
    howTo: [
      "Enter the cron schedule expressions, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for developers, operations notes, and scheduled jobs.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for developers, operations notes, and scheduled jobs rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'css-button-generator': {
    howTo: [
      "Enter the CSS button styles, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for web interfaces, prototypes, and design systems.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for web interfaces, prototypes, and design systems rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'css-grid-generator': {
    howTo: [
      "Enter the CSS Grid layout code, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for galleries, dashboards, cards, and responsive page sections.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for galleries, dashboards, cards, and responsive page sections rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'customer-persona-generator': {
    howTo: [
      "Enter the customer persona drafts, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for marketing, product, sales, and messaging work.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for marketing, product, sales, and messaging work rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'dalle-prompt-generator': {
    howTo: [
      "Enter the rights-aware image prompts, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for original AI image concepts, campaigns, and creative briefs.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for original AI image concepts, campaigns, and creative briefs rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'dialogue-tag-generator': {
    howTo: [
      "Enter the dialogue tag alternatives, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for fiction scenes, scripts, and writing practice.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for fiction scenes, scripts, and writing practice rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'dj-tag-generator': {
    howTo: [
      "Enter the producer tags and DJ drops, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for beats, mixes, intros, and audio branding.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for beats, mixes, intros, and audio branding rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'event-name-generator': {
    howTo: [
      "Enter the event name ideas, audience, style, and any constraints that should shape the result.",
      "Generate a set of options, then compare fit, clarity, originality, and usefulness for conferences, parties, retreats, festivals, and galas.",
      "Regenerate with a narrower prompt if the first set feels too broad, too generic, or off-tone.",
      "Edit the final choice and review it for accuracy, rights, platform rules, and real-world context before using it."],
    tips: [
      { title: "Add real context", body: "Mention the use case, audience, tone, format, and must-include or avoid terms so the generated results feel specific." },
      { title: "Compare options", body: "Look for wording that is clear, adaptable, and appropriate for conferences, parties, retreats, festivals, and galas rather than picking the first result." },
      { title: "Keep it usable", body: "Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project." },
      { title: "Review before publishing", body: "Check spelling, originality, factual details, claims, and any platform or project rules before public use." }]},
  'dj-name-generator': {
    howTo: [
      "Enter the dj name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make DJ Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'app-icon-generator': {
    howTo: [
      "Enter the app icon topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make App Icon Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'banner-generator': {
    howTo: [
      "Enter the banner topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Banner Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'barbarian-name-generator': {
    howTo: [
      "Enter the barbarian name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Barbarian Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'big-text-generator': {
    howTo: [
      "Enter the big text topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Big Text Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'brat-text-generator': {
    howTo: [
      "Enter the brat text topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Brat Text Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'breadcrumb-generator': {
    howTo: [
      "Enter the breadcrumb topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Breadcrumb Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'bubble-text-generator': {
    howTo: [
      "Enter the bubble text topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Bubble Text Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'castle-name-generator': {
    howTo: [
      "Enter the castle name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Castle Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'club-name-generator': {
    howTo: [
      "Enter the club name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Club Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'cocktail-name-generator': {
    howTo: [
      "Enter the cocktail name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Cocktail Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'cowboy-name-generator': {
    howTo: [
      "Enter the cowboy name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Cowboy Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'cursive-name-generator': {
    howTo: [
      "Enter the cursive name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Cursive Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'cute-text-generator': {
    howTo: [
      "Enter the cute text topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Cute Text Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'dinosaur-name-generator': {
    howTo: [
      "Enter the dinosaur name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Dinosaur Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'display-name-generator': {
    howTo: [
      "Enter the display name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Display Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'drag-name-generator': {
    howTo: [
      "Enter the drag queen name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Drag Queen Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'estimate-generator': {
    howTo: [
      "Enter the estimate topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Estimate Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'favicon-generator': {
    howTo: [
      "Enter the favicon topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Favicon Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'funny-name-generator': {
    howTo: [
      "Enter the funny name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Funny Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'gamertag-generator': {
    howTo: [
      "Enter the gamertag topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Gamertag Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'gnome-name-generator': {
    howTo: [
      "Enter the gnome name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Gnome Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'html-code-generator': {
    howTo: [
      "Enter the html code topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make HTML Code Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'invisible-text-generator': {
    howTo: [
      "Enter the invisible text topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Invisible Text Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'letterhead-generator': {
    howTo: [
      "Enter the letterhead topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Letterhead Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'logo-generator': {
    howTo: [
      "Enter the logo topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Logo Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'mermaid-name-generator': {
    howTo: [
      "Enter the mermaid name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Mermaid Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'meta-description-generator': {
    howTo: [
      "Enter the meta description topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Meta Description Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'monster-name-generator': {
    howTo: [
      "Enter the monster name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Monster Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'mood-board-generator': {
    howTo: [
      "Enter the mood board topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Mood Board Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'pen-name-generator': {
    howTo: [
      "Enter the pen name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Pen Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'pet-name-generator': {
    howTo: [
      "Enter the pet name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Pet Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'pixel-text-generator': {
    howTo: [
      "Enter the pixel text topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Pixel Text Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'playlist-name-generator': {
    howTo: [
      "Enter the playlist name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Playlist Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'proposal-generator': {
    howTo: [
      "Enter the proposal topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Proposal Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'qr-code-generator': {
    howTo: [
      "Enter the qr code topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make QR Code Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'retro-text-generator': {
    howTo: [
      "Enter the retro text topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Retro Text Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'robot-name-generator': {
    howTo: [
      "Enter the robot name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Robot Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'ship-name-generator': {
    howTo: [
      "Enter the ship name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Ship Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'short-code-generator': {
    howTo: [
      "Enter the short code topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Short Code Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'sigil-generator': {
    howTo: [
      "Enter the sigil topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Sigil Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'sitemap-generator': {
    howTo: [
      "Enter the sitemap topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Sitemap Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'spaceship-name-generator': {
    howTo: [
      "Enter the spaceship name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Spaceship Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'sports-team-name-generator': {
    howTo: [
      "Enter the sports team name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Sports Team Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'tattoo-name-generator': {
    howTo: [
      "Enter the tattoo name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Tattoo Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'typewriter-text-generator': {
    howTo: [
      "Enter the typewriter text topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Typewriter Text Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'dnd-character-generator': {
    howTo: [
      "Enter the dandd character topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make D&D Character Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'dungeon-generator': {
    howTo: [
      "Enter the dungeon topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Dungeon Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'gaming-name-generator': {
    howTo: [
      "Enter the gaming name topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Gaming Name Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'hashtag-generator': {
    howTo: [
      "Enter the hashtag topic, audience, style, and any details that should shape the result.",
      "Generate a set of options, then compare the wording, fit, and clarity before copying anything.",
      "Regenerate with a narrower prompt if the first result feels too broad or too plain.",
      "Edit the final choice for spelling, context, originality, and safe public use."],
    tips: [
      { title: "Add context", body: "Specific details make Hashtag Generator results more useful and less generic." },
      { title: "Match the use", body: "Choose the option that fits the audience, format, and place where it will appear." },
      { title: "Keep it clear", body: "Shorter outputs are usually easier to read, remember, and reuse." },
      { title: "Review before publishing", body: "Check spelling, claims, originality, and platform or project rules before using the output publicly." }]},
  'dnd-name-generator': {
    howTo: [
      "Describe the exact D&D names you need, including race, class, setting tone, and pronunciation.",
      "Choose the output that best fits characters, NPCs, parties, and one-shot notes, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Review names against your table rules and published settings before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest D&D names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for players and dungeon masters, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to characters, NPCs, parties, and one-shot notes." }]},
  'productivity-prompt-generator': {
    howTo: [
      "Describe the exact productivity prompts you need, including role, time horizon, blockers, and desired output format.",
      "Choose the output that best fits planning sessions, weekly reviews, prioritization, and habit resets, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Treat prompts as planning aids, not guaranteed performance advice before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest productivity prompts usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for workers, students, and creators, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to planning sessions, weekly reviews, prioritization, and habit resets." }]},
  'pwa-manifest-generator': {
    howTo: [
      "Describe the exact PWA manifest drafts you need, including app name, display mode, theme colors, icons, and start URL.",
      "Choose the output that best fits manifest.json planning for installable web apps, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Validate the finished manifest in your own build and browser tooling before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest PWA manifest drafts usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for web developers and product teams, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to manifest.json planning for installable web apps." }]},
  'viral-hook-generator': {
    howTo: [
      "Describe the exact short-form hooks you need, including audience, promise, angle, format, and proof points.",
      "Choose the output that best fits opening lines for posts, videos, newsletters, and ads, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Avoid exaggerated claims or guaranteed reach language before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest short-form hooks usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for creators, marketers, and editors, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to opening lines for posts, videos, newsletters, and ads." }]},
  'ad-copy-generator': {
    howTo: [
      "Describe the exact ad copy drafts you need, including offer, audience, channel, tone, proof, and constraints.",
      "Choose the output that best fits headlines, primary text, calls to action, and offer tests, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Review claims, pricing, policies, and compliance before launch before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest ad copy drafts usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for marketers and small business owners, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to headlines, primary text, calls to action, and offer tests." }]},
  'ai-prompt-generator': {
    howTo: [
      "Describe the exact AI prompts you need, including task, context, format, role, examples, and constraints.",
      "Choose the output that best fits structured prompts for brainstorming, writing, analysis, and workflows, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Verify generated answers and avoid sharing sensitive data before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest AI prompts usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for writers, builders, researchers, and operators, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to structured prompts for brainstorming, writing, analysis, and workflows." }]},
  'album-name-generator': {
    howTo: [
      "Describe the exact album names you need, including genre, mood, themes, era, and title length.",
      "Choose the output that best fits EPs, mixtapes, concept albums, and release moodboards, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Check originality and availability before release artwork or distribution before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest album names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for musicians, producers, and labels, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to EPs, mixtapes, concept albums, and release moodboards." }]},
  'alien-name-generator': {
    howTo: [
      "Describe the exact alien names you need, including language feel, biology, culture, and story role.",
      "Choose the output that best fits species, planets, diplomats, factions, and background characters, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Keep invented cultures respectful and internally consistent before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest alien names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for sci-fi writers and game masters, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to species, planets, diplomats, factions, and background characters." }]},
  'all-caps-generator': {
    howTo: [
      "Describe the exact all-caps text you need, including message length, spacing, tone, and readability.",
      "Choose the output that best fits headlines, labels, short announcements, and emphasis tests, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Use caps sparingly so the result stays readable and appropriate before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest all-caps text usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for designers, social posters, and editors, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to headlines, labels, short announcements, and emphasis tests." }]},
  'angel-name-generator': {
    howTo: [
      "Describe the exact angel names you need, including tone, rank, mythology flavor, and pronunciation.",
      "Choose the output that best fits celestial characters, orders, artifacts, and lore notes, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Use cultural or religious references thoughtfully before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest angel names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for fantasy writers and roleplayers, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to celestial characters, orders, artifacts, and lore notes." }]},
  'anime-name-generator': {
    howTo: [
      "Describe the exact anime-style names you need, including genre, personality, setting, and name style.",
      "Choose the output that best fits original characters, teams, schools, and story concepts, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Avoid implying affiliation with existing series or characters before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest anime-style names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for artists, writers, and character designers, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to original characters, teams, schools, and story concepts." }]},
  'app-name-generator': {
    howTo: [
      "Describe the exact app name ideas you need, including category, audience, benefit, tone, and word length.",
      "Choose the output that best fits mobile apps, SaaS ideas, prototypes, and product concepts, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Check trademarks, domains, and store availability before launch before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest app name ideas usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for founders, designers, and indie builders, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to mobile apps, SaaS ideas, prototypes, and product concepts." }]},
  'art-name-generator': {
    howTo: [
      "Describe the exact art titles you need, including medium, mood, subject, theme, and title style.",
      "Choose the output that best fits paintings, digital pieces, collections, and exhibition notes, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Choose titles that support the work without overexplaining it before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest art titles usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for artists, curators, and students, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to paintings, digital pieces, collections, and exhibition notes." }]},
  'art-tag-generator': {
    howTo: [
      "Describe the exact art tags you need, including medium, subject, style, color, and intended audience.",
      "Choose the output that best fits portfolio labels, marketplace tags, and archive keywords, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Avoid irrelevant trend tags that misdescribe the artwork before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest art tags usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for artists, sellers, and portfolio managers, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to portfolio labels, marketplace tags, and archive keywords." }]},
  'ascii-text-generator': {
    howTo: [
      "Describe the exact ASCII text art you need, including text, width, style, and where it will be displayed.",
      "Choose the output that best fits plain-text banners, terminal headers, comments, and profile accents, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Test spacing in the destination font before publishing before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest ASCII text art usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for developers, moderators, and community builders, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to plain-text banners, terminal headers, comments, and profile accents." }]},
  'avatar-name-generator': {
    howTo: [
      "Describe the exact avatar names you need, including vibe, genre, length, and words to include or avoid.",
      "Choose the output that best fits profiles, personas, characters, and social handles, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Check handle availability and community rules before using publicly before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest avatar names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for gamers, creators, and community members, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to profiles, personas, characters, and social handles." }]},
  'bakery-name-generator': {
    howTo: [
      "Describe the exact bakery names you need, including specialty, location, tone, and customer type.",
      "Choose the output that best fits bakery brands, pop-ups, menus, and cottage food projects, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Check local naming, trademark, and domain availability before printing before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest bakery names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for home bakers and food founders, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to bakery brands, pop-ups, menus, and cottage food projects." }]},
  'bibliography-generator': {
    howTo: [
      "Describe the exact bibliography drafts you need, including citation style, source type, author, title, date, and URL.",
      "Choose the output that best fits source lists, reading notes, and citation planning, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Verify every citation against the required style guide before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest bibliography drafts usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for students, researchers, and writers, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to source lists, reading notes, and citation planning." }]},
  'book-club-name-generator': {
    howTo: [
      "Describe the exact book club names you need, including genre, group personality, age range, and meeting vibe.",
      "Choose the output that best fits reading groups, classroom clubs, newsletters, and social pages, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Pick a name that is welcoming and easy for members to share before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest book club names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for readers, librarians, and community organizers, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to reading groups, classroom clubs, newsletters, and social pages." }]},
  'book-name-generator': {
    howTo: [
      "Describe the exact book title ideas you need, including genre, premise, audience, mood, and title length.",
      "Choose the output that best fits novels, nonfiction projects, chapters, and series concepts, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Check originality before covers, ISBNs, or public announcements before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest book title ideas usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for authors, editors, and writing groups, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to novels, nonfiction projects, chapters, and series concepts." }]},
  'business-card-generator': {
    howTo: [
      "Describe the exact business card copy you need, including role, services, contact fields, tone, and space limits.",
      "Choose the output that best fits card text, service blurbs, contact layouts, and networking variants, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Proofread contact details and keep claims clear and modest before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest business card copy usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for freelancers and small teams, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to card text, service blurbs, contact layouts, and networking variants." }]},
  'cat-name-generator': {
    howTo: [
      "Describe the exact cat names you need, including personality, color, breed, sound, and name length.",
      "Choose the output that best fits new pets, foster notes, adoption listings, and themed name lists, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Choose a name that is easy to say and comfortable to use daily before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest cat names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for pet owners and shelter teams, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to new pets, foster notes, adoption listings, and themed name lists." }]},
  'channel-name-generator': {
    howTo: [
      "Describe the exact channel names you need, including niche, audience, tone, format, and memorable words.",
      "Choose the output that best fits YouTube channels, podcasts, streams, and content series, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Check availability and avoid implying affiliation with existing channels before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest channel names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for video creators, streamers, and educators, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to YouTube channels, podcasts, streams, and content series." }]},
  'character-backstory-generator': {
    howTo: [
      "Describe the exact character backstories you need, including setting, role, flaw, goal, and relationship details.",
      "Choose the output that best fits motives, origins, conflicts, secrets, and campaign hooks, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Edit for continuity and avoid harmful stereotypes before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest character backstories usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for writers, roleplayers, and game masters, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to motives, origins, conflicts, secrets, and campaign hooks." }]},
  'character-name-generator': {
    howTo: [
      "Describe the exact character names you need, including genre, culture inspiration, personality, and pronunciation.",
      "Choose the output that best fits protagonists, side characters, NPCs, and concept sheets, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Check that names fit the setting and are not accidental copies before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest character names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for writers, game masters, and artists, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to protagonists, side characters, NPCs, and concept sheets." }]},
  'cipher-generator': {
    howTo: [
      "Describe the exact cipher text you need, including message, cipher type, spacing, and difficulty.",
      "Choose the output that best fits simple encoded messages, clue sheets, and practice puzzles, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Do not use simple ciphers for real security or private data before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest cipher text usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for puzzle makers and classroom users, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to simple encoded messages, clue sheets, and practice puzzles." }]},
  'citation-generator': {
    howTo: [
      "Describe the exact citation drafts you need, including style, source type, author, title, date, publisher, and URL.",
      "Choose the output that best fits MLA, APA, Chicago-style citation planning and source cleanup, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Verify formatting with your style guide or instructor requirements before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest citation drafts usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for students, writers, and researchers, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to MLA, APA, Chicago-style citation planning and source cleanup." }]},
  'city-name-generator': {
    howTo: [
      "Describe the exact city names you need, including climate, culture, language feel, size, and history.",
      "Choose the output that best fits fantasy cities, sci-fi colonies, regions, and map labels, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Keep names pronounceable and consistent with nearby places before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest city names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for worldbuilders and game masters, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to fantasy cities, sci-fi colonies, regions, and map labels." }]},
  'coin-flip': {
    howTo: [
      "Describe the exact coin flip results you need, including number of flips, labels, and whether repeats matter.",
      "Choose the output that best fits quick random choices, games, and lightweight demos, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Use it for casual randomness, not high-stakes decisions before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest coin flip results usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for decision makers and classroom users, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to quick random choices, games, and lightweight demos." }]},
  'college-name-generator': {
    howTo: [
      "Describe the exact college names you need, including region, prestige, subject focus, and tone.",
      "Choose the output that best fits fictional schools, campuses, academies, and worldbuilding notes, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Avoid names that copy real institutions too closely before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest college names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for writers, game designers, and project teams, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to fictional schools, campuses, academies, and worldbuilding notes." }]},
  'compliment-generator': {
    howTo: [
      "Describe the exact compliments you need, including relationship, occasion, tone, and specific trait.",
      "Choose the output that best fits kind notes, cards, shoutouts, and morale messages, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Keep compliments sincere, respectful, and appropriate to the context before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest compliments usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for friends, teams, and community managers, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to kind notes, cards, shoutouts, and morale messages." }]},
  'content-calendar-generator': {
    howTo: [
      "Describe the exact content calendars you need, including audience, channel, cadence, goals, and content pillars.",
      "Choose the output that best fits weekly plans, topic schedules, campaign ideas, and posting themes, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Avoid promises about reach and review workload before committing before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest content calendars usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for creators, marketers, and small teams, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to weekly plans, topic schedules, campaign ideas, and posting themes." }]},
  'cool-text-generator': {
    howTo: [
      "Describe the exact cool text styles you need, including text, vibe, readability, and destination platform.",
      "Choose the output that best fits stylized names, short bios, captions, and decorative snippets, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Test compatibility because some characters may not display everywhere before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest cool text styles usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for profile editors and social creators, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to stylized names, short bios, captions, and decorative snippets." }]},
  'corporate-speak-generator': {
    howTo: [
      "Describe the exact corporate wording you need, including audience, formality, topic, and whether humor is acceptable.",
      "Choose the output that best fits polished phrases, meeting notes, email wording, and playful rewrites, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Avoid vague language when clarity matters before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest corporate wording usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for writers, presenters, and internal comms teams, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to polished phrases, meeting notes, email wording, and playful rewrites." }]},
  'couple-name-generator': {
    howTo: [
      "Describe the exact couple names you need, including two names, shared interests, tone, and privacy needs.",
      "Choose the output that best fits ship names, wedding hashtags, playlist titles, and keepsake ideas, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Avoid posting personal details without consent before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest couple names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for friends, creators, and event planners, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to ship names, wedding hashtags, playlist titles, and keepsake ideas." }]},
  'coupon-code-generator': {
    howTo: [
      "Describe the exact coupon codes you need, including brand words, discount type, campaign, and code length.",
      "Choose the output that best fits promo codes, seasonal offers, email campaigns, and checkout tests, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Confirm codes in your ecommerce system before sharing before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest coupon codes usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for shop owners and campaign planners, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to promo codes, seasonal offers, email campaigns, and checkout tests." }]},
  'creepy-text-generator': {
    howTo: [
      "Describe the exact creepy text you need, including mood, intensity, length, and readability.",
      "Choose the output that best fits spooky captions, props, usernames, and story accents, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Keep horror themes fictional and avoid targeted harassment before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest creepy text usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for writers, designers, and Halloween planners, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to spooky captions, props, usernames, and story accents." }]},
  'css-code-generator': {
    howTo: [
      "Describe the exact CSS code drafts you need, including selector, layout goal, colors, spacing, and browser needs.",
      "Choose the output that best fits layout snippets, style ideas, components, and quick experiments, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Test generated CSS in your project before shipping before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest CSS code drafts usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for developers and designers, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to layout snippets, style ideas, components, and quick experiments." }]},
  'demon-name-generator': {
    howTo: [
      "Describe the exact demon names you need, including tone, power level, mythology flavor, and pronunciation.",
      "Choose the output that best fits villains, entities, cult lore, artifacts, and campaign notes, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Keep religious or cultural references thoughtful and fictionalized before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest demon names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for fantasy writers and game masters, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to villains, entities, cult lore, artifacts, and campaign notes." }]},
  'dice-roller': {
    howTo: [
      "Describe the exact dice rolls you need, including dice notation, modifier, roll count, and advantage rules.",
      "Choose the output that best fits RPG rolls, classroom games, quick randomizers, and probability demos, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Use it for casual play, not gambling or high-stakes decisions before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest dice rolls usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for players, teachers, and tabletop groups, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to RPG rolls, classroom games, quick randomizers, and probability demos." }]},
  'diner-name-generator': {
    howTo: [
      "Describe the exact diner names you need, including food style, location, era, and customer vibe.",
      "Choose the output that best fits retro diners, food trucks, fictional restaurants, and menu concepts, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Check availability before signage, menus, or domain purchase before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest diner names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for restaurant founders and writers, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to retro diners, food trucks, fictional restaurants, and menu concepts." }]},
  'discord-name-generator': {
    howTo: [
      "Describe the exact Discord names you need, including vibe, length, symbols, and community rules.",
      "Choose the output that best fits server nicknames, roleplay profiles, gaming aliases, and creator personas, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Avoid impersonation and check server naming guidelines before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest Discord names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for community members and moderators, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to server nicknames, roleplay profiles, gaming aliases, and creator personas." }]},
  'discord-timestamp-generator': {
    howTo: [
      "Describe the exact Discord timestamps you need, including date, time zone, display style, and audience region.",
      "Choose the output that best fits event announcements, reminders, schedules, and countdown posts, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Double-check the time zone before sending to a server before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest Discord timestamps usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for community managers and event hosts, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to event announcements, reminders, schedules, and countdown posts." }]},
  'dog-name-generator': {
    howTo: [
      "Describe the exact dog names you need, including personality, size, sound, breed, and name length.",
      "Choose the output that best fits new puppies, rescues, adoption listings, and themed name lists, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Choose a name that is easy to call and comfortable daily before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest dog names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for pet owners, fosters, and shelters, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to new puppies, rescues, adoption listings, and themed name lists." }]},
  'dragon-name-generator': {
    howTo: [
      "Describe the exact dragon names you need, including element, age, temperament, language feel, and title style.",
      "Choose the output that best fits dragons, clans, lairs, ancient titles, and campaign lore, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Keep names readable enough for players or readers to remember before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest dragon names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for fantasy writers and game masters, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to dragons, clans, lairs, ancient titles, and campaign lore." }]},
  'dragonborn-name-generator': {
    howTo: [
      "Describe the exact dragonborn names you need, including ancestry, element, role, clan tone, and pronunciation.",
      "Choose the output that best fits player characters, NPCs, clans, and backstory notes, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Adapt names to your campaign setting and table preferences before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest dragonborn names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for RPG players and fantasy writers, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to player characters, NPCs, clans, and backstory notes." }]},
  'dummy-data-generator': {
    howTo: [
      "Describe the exact dummy data you need, including field names, formats, count, locale, and edge cases.",
      "Choose the output that best fits sample records, mock tables, prototypes, and fixture planning, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Do not use real personal data in test fixtures before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest dummy data usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for developers, QA testers, and designers, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to sample records, mock tables, prototypes, and fixture planning." }]},
  'dungeon-name-generator': {
    howTo: [
      "Describe the exact dungeon names you need, including theme, danger level, inhabitants, treasure, and history.",
      "Choose the output that best fits caves, ruins, towers, lairs, and quest locations, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Choose names that hint at play without spoiling every secret before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest dungeon names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for game masters and level designers, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to caves, ruins, towers, lairs, and quest locations." }]},
  'dwarf-name-generator': {
    howTo: [
      "Describe the exact dwarf names you need, including clan role, craft, region, tone, and pronunciation.",
      "Choose the output that best fits heroes, clans, smiths, kingdoms, and NPC rosters, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Keep names consistent with the culture you are building before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest dwarf names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for fantasy writers and RPG players, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to heroes, clans, smiths, kingdoms, and NPC rosters." }]},
  'elf-name-generator': {
    howTo: [
      "Describe the exact elf names you need, including realm, elegance, age, role, and sound pattern.",
      "Choose the output that best fits characters, houses, settlements, and story notes, then adjust wording for your audience.",
      "Regenerate with tighter constraints if the first results feel too broad, too plain, or off-tone.",
      "Avoid making every name too similar; vary length and rhythm before you publish, print, or share it."],
    tips: [
      { title: "Add useful context", body: "The strongest elf names usually come from a clear purpose, audience, and a few concrete details." },
      { title: "Compare variations", body: "Generate multiple options so you can spot patterns, remove weak choices, and combine the best parts." },
      { title: "Edit for fit", body: "Treat the output as a starting point for fantasy writers and RPG players, not a final decision that cannot be changed." },
      { title: "Check before use", body: "Review spelling, clarity, originality, and any project or platform rules that apply to characters, houses, settlements, and story notes." }]},
  'email-name-generator': {
    howTo: [
      "Enter the email address name ideas you need, including name style, role, initials, domain context, and privacy needs.",
      "Generate a few options and compare which one best fits new inboxes, aliases, newsletters, and contact addresses.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check availability and avoid exposing private information before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the email address name ideas match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to new inboxes, aliases, newsletters, and contact addresses." }]},
  'email-signature-generator': {
    howTo: [
      "Enter the email signature copy you need, including name, role, company, contact fields, tone, and required links.",
      "Generate a few options and compare which one best fits professional signatures, contact blocks, role summaries, and reply templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Proofread contact details before sending before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the email signature copy match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to professional signatures, contact blocks, role summaries, and reply templates." }]},
  'email-subject-generator': {
    howTo: [
      "Enter the email subject lines you need, including recipient, purpose, offer, tone, length, and urgency level.",
      "Generate a few options and compare which one best fits newsletters, outreach, announcements, reminders, and follow-ups.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Avoid misleading urgency or promises the email cannot support before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the email subject lines match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to newsletters, outreach, announcements, reminders, and follow-ups." }]},
  'error-message-generator': {
    howTo: [
      "Enter the error message copy you need, including what went wrong, user action, tone, and recovery step.",
      "Generate a few options and compare which one best fits form errors, empty states, failed actions, and troubleshooting prompts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Keep messages accurate and avoid blaming the user before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the error message copy match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to form errors, empty states, failed actions, and troubleshooting prompts." }]},
  'essay-title-generator': {
    howTo: [
      "Enter the essay title ideas you need, including topic, thesis angle, subject, audience, and required style.",
      "Generate a few options and compare which one best fits class essays, research papers, argument drafts, and reading responses.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Confirm the final title fits your assignment requirements before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the essay title ideas match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to class essays, research papers, argument drafts, and reading responses." }]},
  'essay-topic-generator': {
    howTo: [
      "Enter the essay topic ideas you need, including subject, grade level, scope, source requirements, and stance.",
      "Generate a few options and compare which one best fits argument prompts, research directions, class discussions, and paper planning.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Choose a topic you can support with credible sources before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the essay topic ideas match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to argument prompts, research directions, class discussions, and paper planning." }]},
  'fairy-name-generator': {
    howTo: [
      "Enter the fairy names you need, including realm, personality, element, name length, and sound style.",
      "Generate a few options and compare which one best fits characters, courts, forests, spells, and whimsical worldbuilding notes.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Keep names original and consistent with your setting before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the fairy names match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, courts, forests, spells, and whimsical worldbuilding notes." }]},
  'faq-generator': {
    howTo: [
      "Enter the FAQ drafts you need, including audience, page topic, objections, policy details, and tone.",
      "Generate a few options and compare which one best fits product pages, help centers, landing pages, and onboarding docs.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Verify answers against your real policies and product details before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the FAQ drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to product pages, help centers, landing pages, and onboarding docs." }]},
  'flashcard-generator': {
    howTo: [
      "Enter the flashcard prompts you need, including topic, difficulty, answer style, examples, and number of cards.",
      "Generate a few options and compare which one best fits study decks, review cards, quiz prep, and classroom practice.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review facts before studying or sharing with learners before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the flashcard prompts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to study decks, review cards, quiz prep, and classroom practice." }]},
  'flexbox-generator': {
    howTo: [
      "Enter the CSS flexbox snippets you need, including direction, alignment, wrapping, spacing, and target behavior.",
      "Generate a few options and compare which one best fits responsive rows, centered layouts, nav bars, cards, and UI sections.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Test the CSS in your actual layout and browser targets before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the CSS flexbox snippets match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to responsive rows, centered layouts, nav bars, cards, and UI sections." }]},
  'flower-name-generator': {
    howTo: [
      "Enter the flower names you need, including color, season, mood, region, and name style.",
      "Generate a few options and compare which one best fits fictional blooms, floral products, events, and garden notes.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check real plant names if accuracy matters before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the flower names match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to fictional blooms, floral products, events, and garden notes." }]},
  'follow-up-email-generator': {
    howTo: [
      "Enter the follow-up email drafts you need, including prior conversation, recipient, timing, ask, and tone.",
      "Generate a few options and compare which one best fits polite reminders, meeting recaps, outreach follow-ups, and next-step notes.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Avoid pressure tactics and confirm details before sending before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the follow-up email drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to polite reminders, meeting recaps, outreach follow-ups, and next-step notes." }]},
  'font-pairing-generator': {
    howTo: [
      "Enter the font pairing ideas you need, including project type, mood, readability needs, and display/body roles.",
      "Generate a few options and compare which one best fits brand kits, landing pages, posters, resumes, and UI mockups.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check licensing and legibility before publishing before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the font pairing ideas match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand kits, landing pages, posters, resumes, and UI mockups." }]},
  'food-truck-name-generator': {
    howTo: [
      "Enter the food truck names you need, including cuisine, city, vibe, signature dish, and word length.",
      "Generate a few options and compare which one best fits mobile food brands, pop-ups, menus, and fictional eateries.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check local availability before signage or permits before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the food truck names match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to mobile food brands, pop-ups, menus, and fictional eateries." }]},
  'footnote-generator': {
    howTo: [
      "Enter the footnote drafts you need, including citation style, source details, note purpose, and required format.",
      "Generate a few options and compare which one best fits paper notes, source explanations, manuscript drafts, and reading documentation.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Verify formatting with the required style guide before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the footnote drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to paper notes, source explanations, manuscript drafts, and reading documentation." }]},
  'form-generator': {
    howTo: [
      "Enter the HTML form drafts you need, including fields, labels, validation, submit action, and accessibility needs.",
      "Generate a few options and compare which one best fits contact forms, signup flows, surveys, and simple data collection screens.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Test validation, privacy, and accessibility in your project before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the HTML form drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to contact forms, signup flows, surveys, and simple data collection screens." }]},
  'game-idea-generator': {
    howTo: [
      "Enter the game ideas you need, including genre, player count, platform, time limit, and mood.",
      "Generate a few options and compare which one best fits mechanics, themes, loops, constraints, and prototype pitches.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Scope ideas realistically before production before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the game ideas match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to mechanics, themes, loops, constraints, and prototype pitches." }]},
  'gibberish-generator': {
    howTo: [
      "Enter the gibberish text you need, including length, rhythm, readability, and whether it should look pronounceable.",
      "Generate a few options and compare which one best fits placeholder copy, fantasy language flavor, UI tests, and nonsense names.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Do not use nonsense text where real instructions are needed before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the gibberish text match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to placeholder copy, fantasy language flavor, UI tests, and nonsense names." }]},
  'giveaway-generator': {
    howTo: [
      "Enter the giveaway winner picks you need, including entry list, number of winners, labels, and redraw rules.",
      "Generate a few options and compare which one best fits casual drawings, classroom picks, raffle-style lists, and stream prompts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Use transparent rules and avoid high-stakes prize handling before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the giveaway winner picks match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to casual drawings, classroom picks, raffle-style lists, and stream prompts." }]},
  'goblin-name-generator': {
    howTo: [
      "Enter the goblin names you need, including tone, tribe role, sound style, and campaign setting.",
      "Generate a few options and compare which one best fits NPCs, clans, markets, villains, and comic side characters.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Keep names original and table-appropriate before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the goblin names match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to NPCs, clans, markets, villains, and comic side characters." }]},
  'gradient-generator': {
    howTo: [
      "Enter the CSS gradient ideas you need, including colors, direction, contrast, and design context.",
      "Generate a few options and compare which one best fits backgrounds, buttons, cards, hero sections, and UI accents.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Test contrast and readability with real content before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the CSS gradient ideas match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to backgrounds, buttons, cards, hero sections, and UI accents." }]},
  'graffiti-text-generator': {
    howTo: [
      "Enter the graffiti-style text you need, including word, vibe, readability, color direction, and use case.",
      "Generate a few options and compare which one best fits posters, usernames, stickers, party graphics, and title treatments.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Use only where stylized text fits the audience and context before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the graffiti-style text match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to posters, usernames, stickers, party graphics, and title treatments." }]},
  'graphql-query-generator': {
    howTo: [
      "Enter the GraphQL query drafts you need, including schema fields, variables, nesting depth, and response shape.",
      "Generate a few options and compare which one best fits queries, mutations, fragments, mock examples, and schema exploration.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Validate against your real schema before shipping before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the GraphQL query drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to queries, mutations, fragments, mock examples, and schema exploration." }]},
  'guild-name-generator': {
    howTo: [
      "Enter the guild names you need, including game style, alignment, theme, size, and tone.",
      "Generate a few options and compare which one best fits guilds, clans, factions, raid teams, and story organizations.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check community rules and avoid copying existing groups before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the guild names match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to guilds, clans, factions, raid teams, and story organizations." }]},
  'hash-generator': {
    howTo: [
      "Enter the hash values you need, including algorithm, input text, encoding, and expected format.",
      "Generate a few options and compare which one best fits checksums, demos, sample digests, and data comparison exercises.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Do not treat hashes alone as password security before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the hash values match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to checksums, demos, sample digests, and data comparison exercises." }]},
  'headline-generator': {
    howTo: [
      "Enter the headline ideas you need, including topic, audience, benefit, angle, and tone.",
      "Generate a few options and compare which one best fits articles, landing pages, newsletters, ads, and social posts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Avoid clickbait claims the content does not support before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the headline ideas match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to articles, landing pages, newsletters, ads, and social posts." }]},
  'hex-color-generator': {
    howTo: [
      "Enter the hex color values you need, including base color, mood, contrast needs, and usage context.",
      "Generate a few options and compare which one best fits palettes, UI accents, CSS variables, mockups, and design tokens.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Test accessibility contrast before publishing before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the hex color values match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to palettes, UI accents, CSS variables, mockups, and design tokens." }]},
  'horse-name-generator': {
    howTo: [
      "Enter the horse names you need, including breed, color, temperament, discipline, and name length.",
      "Generate a few options and compare which one best fits stable names, fictional horses, racehorse ideas, and themed lists.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check registration or competition naming rules when needed before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the horse names match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to stable names, fictional horses, racehorse ideas, and themed lists." }]},
  'hotel-name-generator': {
    howTo: [
      "Enter the hotel names you need, including location, audience, style, price tier, and atmosphere.",
      "Generate a few options and compare which one best fits boutique hotels, inns, resorts, fictional stays, and brand concepts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check trademark, domain, and local business availability before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the hotel names match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to boutique hotels, inns, resorts, fictional stays, and brand concepts." }]},
  'hreflang-tag-generator': {
    howTo: [
      "Enter the hreflang tag drafts you need, including language codes, region codes, canonical URLs, and alternate URLs.",
      "Generate a few options and compare which one best fits international page annotations, locale mapping, and multilingual SEO checks.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Validate tags against your real URL structure before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the hreflang tag drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to international page annotations, locale mapping, and multilingual SEO checks." }]},
  'htaccess-generator': {
    howTo: [
      "Enter the .htaccess rule drafts you need, including domain preference, redirect pattern, cache duration, and server goal.",
      "Generate a few options and compare which one best fits redirects, HTTPS rules, caching snippets, and Apache configuration planning.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Test rules safely before deploying to production before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the .htaccess rule drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to redirects, HTTPS rules, caching snippets, and Apache configuration planning." }]},
  'html-table-generator': {
    howTo: [
      "Enter the HTML table drafts you need, including columns, rows, headings, alignment, and accessibility needs.",
      "Generate a few options and compare which one best fits comparison tables, pricing rows, schedules, and documentation examples.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review semantics and responsive behavior before publishing before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the HTML table drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to comparison tables, pricing rows, schedules, and documentation examples." }]},
  'icebreaker-generator': {
    howTo: [
      "Enter the icebreaker questions you need, including group size, setting, comfort level, and topic boundaries.",
      "Generate a few options and compare which one best fits meetings, workshops, classrooms, onboarding, and events.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Keep prompts inclusive and optional for participants before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the icebreaker questions match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to meetings, workshops, classrooms, onboarding, and events." }]},
  'image-alt-text-generator': {
    howTo: [
      "Enter the image alt text drafts you need, including image subject, context, function, and surrounding content.",
      "Generate a few options and compare which one best fits website images, product photos, charts, thumbnails, and blog graphics.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review alt text for accuracy and accessibility fit before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the image alt text drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to website images, product photos, charts, thumbnails, and blog graphics." }]},
  'island-name-generator': {
    howTo: [
      "Enter the island names you need, including climate, culture, geography, danger level, and sound style.",
      "Generate a few options and compare which one best fits maps, campaigns, novels, resorts, and fictional regions.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Keep names consistent with nearby places and cultures before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the island names match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to maps, campaigns, novels, resorts, and fictional regions." }]},
  'japanese-name-generator': {
    howTo: [
      "Enter the Japanese-inspired name ideas you need, including gender style, era, tone, surname needs, and romanization.",
      "Generate a few options and compare which one best fits fictional characters, naming exercises, and story drafts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Verify real-world usage with reliable language sources before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the Japanese-inspired name ideas match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to fictional characters, naming exercises, and story drafts." }]},
  'joke-generator': {
    howTo: [
      "Enter the joke drafts you need, including topic, audience, tone, length, and boundaries.",
      "Generate a few options and compare which one best fits clean jokes, captions, openers, party prompts, and light entertainment.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review humor for context and avoid targeting people before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the joke drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to clean jokes, captions, openers, party prompts, and light entertainment." }]},
  'json-formatter': {
    howTo: [
      "Enter the formatted JSON you need, including raw JSON, indentation preference, sorting needs, and validation goals.",
      "Generate a few options and compare which one best fits readable objects, config snippets, API responses, and debugging notes.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Avoid pasting secrets or private production data before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the formatted JSON match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to readable objects, config snippets, API responses, and debugging notes." }]},
  'json-schema-generator': {
    howTo: [
      "Enter the JSON schema drafts you need, including sample object, required fields, data types, and constraints.",
      "Generate a few options and compare which one best fits validation schemas, API docs, mock payloads, and typed contracts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Validate the schema against your real data before relying on it before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the JSON schema drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to validation schemas, API docs, mock payloads, and typed contracts." }]},
  'keyword-generator': {
    howTo: [
      "Enter the keyword ideas you need, including topic, audience, modifiers, intent, and exclusions.",
      "Generate a few options and compare which one best fits content briefs, tag lists, ad groups, and research starting points.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Treat ideas as research starters, not ranking guarantees before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the keyword ideas match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to content briefs, tag lists, ad groups, and research starting points." }]},
  'kingdom-name-generator': {
    howTo: [
      "Enter the kingdom names you need, including terrain, culture, ruler style, age, and tone.",
      "Generate a few options and compare which one best fits realms, empires, dynasties, regions, and map labels.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Keep naming patterns consistent across your world before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the kingdom names match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to realms, empires, dynasties, regions, and map labels." }]},
  'korean-name-generator': {
    howTo: [
      "Enter the Korean-inspired name ideas you need, including gender style, surname needs, tone, and romanization.",
      "Generate a few options and compare which one best fits fictional characters, naming exercises, and story drafts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Verify real-world usage with reliable language sources before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the Korean-inspired name ideas match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to fictional characters, naming exercises, and story drafts." }]},
  'landing-page-copy-generator': {
    howTo: [
      "Enter the landing page copy drafts you need, including offer, audience, pain point, proof, tone, and desired action.",
      "Generate a few options and compare which one best fits hero sections, benefit blocks, CTAs, FAQs, and page outlines.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Avoid guarantees about revenue, ranking, or conversion before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the landing page copy drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to hero sections, benefit blocks, CTAs, FAQs, and page outlines." }]},
  'leet-text-generator': {
    howTo: [
      "Enter the leet speak text you need, including text, intensity, readability, and destination platform.",
      "Generate a few options and compare which one best fits usernames, short phrases, game handles, and nostalgic text effects.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Make sure the result is readable where you plan to use it before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the leet speak text match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to usernames, short phrases, game handles, and nostalgic text effects." }]},
  'lesson-plan-generator': {
    howTo: [
      "Enter the lesson plan drafts you need, including grade level, subject, duration, standards, and learner needs.",
      "Generate a few options and compare which one best fits objectives, activities, materials, checks, and homework ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Adapt plans to your classroom and school requirements before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the lesson plan drafts match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to objectives, activities, materials, checks, and homework ideas." }]},
  'lowercase-generator': {
    howTo: [
      "Enter the lowercase text you need, including input text, punctuation needs, and whether formatting should be preserved.",
      "Generate a few options and compare which one best fits clean text conversion, data cleanup, social formatting, and style tests.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review proper nouns and acronyms after conversion before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the lowercase text match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to clean text conversion, data cleanup, social formatting, and style tests." }]},
  'magic-name-generator': {
    howTo: [
      "Enter the magic names you need, including element, power level, tradition, tone, and pronunciation.",
      "Generate a few options and compare which one best fits spells, schools, artifacts, rituals, and magical orders.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Keep names original and consistent with your lore before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the magic names match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to spells, schools, artifacts, rituals, and magical orders." }]},
  'medieval-name-generator': {
    howTo: [
      "Enter the medieval-style names you need, including region inspiration, social role, tone, and surname style.",
      "Generate a few options and compare which one best fits characters, villages, houses, and campaign notes.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Use historical inspiration carefully and verify facts when accuracy matters before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the medieval-style names match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, villages, houses, and campaign notes." }]},
  'meeting-agenda-generator': {
    howTo: [
      "Enter the meeting agendas you need, including meeting goal, attendees, timebox, decisions, and topics.",
      "Generate a few options and compare which one best fits standups, planning sessions, reviews, retrospectives, and client calls.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Share context early and leave room for real discussion before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the meeting agendas match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to standups, planning sessions, reviews, retrospectives, and client calls." }]},
  'meme-text-generator': {
    howTo: [
      "Enter the meme captions you need, including image context, audience, tone, and joke format.",
      "Generate a few options and compare which one best fits top text, bottom text, reaction captions, and short punchlines.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Avoid harassment, misinformation, or private details before you publish, send, or reuse it."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the meme captions match the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to top text, bottom text, reaction captions, and short punchlines." }]},
  'youtube-tag-generator': {
    howTo: [
      'Enter the real video title, topic, audience, and what viewers will actually see or hear.',
      'Choose the video format, tag strategy, audience fit, and metadata focus that match the upload.',
      'Review the primary, supporting, alternate spelling, audience/format, and avoid sections before copying.',
      'Keep only tags that match the title, thumbnail, description, spoken content, and audience promise.'],
    tips: [
      { title: 'Start with the actual video', body: 'Tags should support the upload metadata, not replace a clear title, thumbnail, and description.' },
      { title: 'Use alternate wording carefully', body: 'Misspellings and shorthand are only useful when viewers truly use them for this topic.' },
      { title: 'Avoid stuffing', body: 'Remove unrelated trends, competitor names, viral claims, and topics the video does not cover.' },
      { title: 'Expect no guaranteed results', body: 'This is independent brainstorming only, with no YouTube affiliation or views, ranking, recommendation, or engagement guarantee.' }]},
  'etsy-tag-generator': {
    howTo: [
      'Enter the real listing details: product type, material, color, style, size, recipient, and use case.',
      'Choose the product, material, aesthetic, occasion, buyer, personalization, and positioning options that match the actual item.',
      'Generate a structured Etsy tag plan with a final 13-tag shortlist, attribute tags, buyer-intent phrases, seasonal angles, and review notes.',
      'Copy only the tags that truthfully match the product, photos, title, description, category, and marketplace rules.'],
    tips: [
      { title: 'Use truthful attributes', body: 'Include only materials, styles, occasions, and personalization that the listing actually supports.' },
      { title: 'Vary the tag set', body: 'Mix item type, material, style, buyer intent, occasion, and recipient language instead of repeating one phrase.' },
      { title: 'Check listing consistency', body: 'Tags should match the photos, title, description, category, variations, and shipping or production details.' },
      { title: 'Avoid unsupported claims', body: 'Do not use handmade, vintage, local, personalized, luxury, or gift-ready wording unless it is true for the item.' }]},
  'pinterest-tag-generator': {
    howTo: [
      'Enter the real pin topic plus visible image details, destination page subject, board theme, and audience intent.',
      'Choose the pin intent, keyword strategy, seasonality, and destination type that match the pin.',
      'Compare pin title keywords, board/topic keywords, description phrases, destination-page checks, and avoid notes.',
      'Copy a small relevant set that matches the image, title, board, description, and landing page.'],
    tips: [
      { title: 'Match the visual', body: 'Pinterest keywords should describe what the image and destination page actually support.' },
      { title: 'Separate board and pin language', body: 'Use broader board terms for organization and more specific phrases for the pin title or description.' },
      { title: 'Use seasonal terms only when true', body: 'Holiday, trend, and shopping language should fit the pin and landing page.' },
      { title: 'No traffic promise', body: 'This independent tool does not guarantee impressions, saves, clicks, traffic, ranking, sales, or visibility.' }]},
  'soundcloud-tag-generator': {
    howTo: [
      'Enter the real track, beat, mix, or episode details, including genre, mood, instruments, vocals, tempo feel, and release context.',
      'Choose the track type, genre family, mood, vocal context, and release context that accurately describe the audio.',
      'Review the final tags, genre/subgenre, mood/energy, instrument/production, community, and avoid sections.',
      'Copy only tags that match the audio, title, description, artwork, credits, rights, and audience.'],
    tips: [
      { title: 'Lead with honest genre', body: 'Use the closest real genre and subgenre before adding mood, scene, or playlist-fit tags.' },
      { title: 'Describe the sound', body: 'Mood, BPM feel, vocals, instruments, and production tags should be audible in the track.' },
      { title: 'Respect credits and rights', body: 'Do not imply samples, remixes, collaborations, or artist associations that are not authorized or true.' },
      { title: 'No play guarantee', body: 'This independent tool does not guarantee plays, ranking, discovery, reposts, followers, playlists, monetization, or engagement.' }]},
  'x-post-generator': {
    howTo: [
      'Enter the real topic, claim, announcement, source, link, or idea you want to turn into an X/Twitter draft.',
      'Choose the draft format, tone, audience, and call to action that match the post intent.',
      'Review the post drafts, thread structure, claim checks, CTA options, and avoid notes before publishing.',
      'Edit for accuracy, context, current platform rules, and audience fit; remove unsupported claims or engagement bait.'],
    tips: [
      { title: 'Start with a verifiable point', body: 'Strong posts make one clear point and label uncertainty instead of overstating outcomes.' },
      { title: 'Choose a fitting CTA', body: 'Questions and discussion prompts should invite useful replies, not fake urgency or engagement bait.' },
      { title: 'Review before posting', body: 'Check links, names, dates, claims, tone, and whether the draft could be read as harassment or misinformation.' },
      { title: 'No reach guarantee', body: 'This independent drafting tool is not affiliated with X/Twitter and does not guarantee impressions, reach, followers, engagement, ranking, monetization, approval, or virality.' }]},
  'midjourney-prompt-generator': {
    howTo: [
      'Enter an original subject or visual brief; avoid names of protected characters, living artists, celebrities, private people, and brands you do not control.',
      'Choose the prompt purpose, subject type, style category, mood, lighting, composition, aspect ratio, detail level, output format, and review level.',
      'Review the final prompt, breakdown, style notes, avoid list, rights checklist, safety checklist, and model limitation notes before copying.',
      'Use the output as a drafting aid only; check current Midjourney rules, rights, likeness, brand, and commercial-use requirements before publishing.'],
    tips: [
      { title: 'Use broad style categories', body: 'Prefer original cinematic, editorial clean, studio product, or illustrative concept language instead of living artist names or franchise references.' },
      { title: 'Treat commercial use separately', body: 'Client, marketplace, ad, product, and merch uses need rights, likeness, brand, and provider-term review beyond the prompt itself.' },
      { title: 'Review generated images', body: 'Check outputs for accidental logos, recognizable likenesses, copied characters, misleading context, artifacts, and safety issues.' },
      { title: 'No output promise', body: 'This independent tool does not guarantee Midjourney acceptance, image quality, exact rendering, copyright clearance, or platform approval.' }]},
  'stable-diffusion-prompt-generator': {
    howTo: [
      'Enter an original subject or visual brief, then choose subject type, purpose, style category, mood, lighting, composition, framing, detail level, and output format.',
      'Use the positive prompt with the negative prompt or avoid list when your Stable Diffusion workflow supports it.',
      'Review settings notes separately for your model, checkpoint, sampler, seed, license, host, and marketplace rules.',
      'Check final images manually before sharing, selling, training, publishing, or using them in client work.'],
    tips: [
      { title: 'Keep prompts original', body: 'Avoid protected characters, living artists, celebrity likenesses, logos, and distinctive third-party styles.' },
      { title: 'Use negative prompts carefully', body: 'Negative prompts can reduce unwanted elements, but they do not guarantee safe, accurate, or rights-cleared images.' },
      { title: 'Know your model terms', body: 'Different checkpoints, LoRAs, hosts, and licenses can carry different restrictions for commercial or public use.' },
      { title: 'No model guarantee', body: 'This tool does not guarantee exact rendering, seed reproducibility, safety filtering, image quality, or commercial-use rights.' }]},
  'shakespeare-insult-generator': {
    howTo: [
      'Enter a fictional character, stage role, friendly inside joke, or harmless situation; avoid private details and real-person vulnerabilities.',
      'Choose intensity, audience/context, tone, target type, family-friendly mode, style variant, count, and whether to include softer rewrites and boundaries.',
      'Review the theatrical lines, softer versions, performance notes, safety boundaries, and checklist before copying.',
      'Use only for opt-in entertainment, fiction, games, or stage-style banter where the audience welcomes playful old-fashioned wording.'],
    tips: [
      { title: 'Keep it theatrical', body: 'Aim for absurd old-style wording, props, timing, and stage delivery rather than modern personal insults.' },
      { title: 'Avoid real targeting', body: 'Do not use protected-class references, sexual insults, threats, humiliation, doxxing, or real-person vulnerabilities.' },
      { title: 'Offer a softer line', body: 'If a line feels sharp, use the softer alternative or turn it into a self-directed joke.' },
      { title: 'Consent matters', body: 'These drafts are for friendly opt-in entertainment only, not bullying, harassment, school/workplace targeting, or repeated unwanted contact.' }]},
  'comeback-generator': {
    howTo: [
      'Enter the low-stakes situation or phrase you want to answer without escalating.',
      'Choose situation type, intensity, tone, target type, boundary style, de-escalation level, style variant, count, safe mode, and softer rewrite options.',
      'Compare the calm comeback, witty comeback, boundary-setting reply, de-escalation reply, and avoid-saying section.',
      'Pick the least escalating reply that still protects your boundary, and do not use it for harassment or pile-ons.'],
    tips: [
      { title: 'Prefer calm first', body: 'A good comeback can be brief, clear, and kind enough to end the exchange instead of heating it up.' },
      { title: 'Set boundaries cleanly', body: 'Use boundary replies when a joke is unwelcome; avoid insults, threats, humiliation, or personal details.' },
      { title: 'Skip unsafe contexts', body: 'Do not use generated replies for workplace harassment, school bullying, protected-class attacks, doxxing, or targeted abuse.' },
      { title: 'Use the avoid section', body: 'The avoid-saying notes help remove lines that sound too personal, sexual, threatening, hateful, or escalating.' }]},
  'roast-generator': {
    howTo: [
      'Enter a harmless habit, fictional character, opt-in event, or friendly context rather than a sensitive personal trait.',
      'Choose roast intensity, relationship context, tone, target type, safe topic, off-limits topic, event type, style, count, safe mode, and softer version options.',
      'Review the light roast, playful roast, clean roast, softer version, off-limits reminder, and safety checklist before using anything.',
      'Use only where friendly roasting is clearly welcome, such as a consenting friend group, game night, toast, or fictional scene.'],
    tips: [
      { title: 'Roast habits, not identities', body: 'Stick to harmless quirks like overplanning, snacks, hobbies, or fictional traits; avoid appearance, identity, health, family, money, trauma, and relationships.' },
      { title: 'Keep it clean', body: 'Family-friendly roast lines are easier to use publicly and less likely to become bullying or humiliation.' },
      { title: 'Know the room', body: 'If the person is not clearly opted in, use a compliment, self-roast, or softer version instead.' },
      { title: 'No abuse framing', body: 'Do not use roast drafts for harassment, threats, hate, doxxing, sexual humiliation, school/workplace targeting, or repeated unwanted contact.' }]},
  'chatgpt-prompt-generator': {
    howTo: [
      'Enter the task, audience, source material, constraints, and any facts the assistant should or should not assume.',
      'Choose the prompt goal, detail level, output format, review sensitivity, and whether to include a human-review checklist.',
      'Copy the role/task prompt, context builder, constraints, output format, and review sections that fit your use case.',
      'Review generated AI output for accuracy, privacy, policy fit, bias, and current facts before using it.'],
    tips: [
      { title: 'Give usable context', body: 'Prompts improve when they include audience, goal, source material, constraints, examples, and success criteria.' },
      { title: 'Set boundaries', body: 'Ask the model to label assumptions, avoid unsupported claims, and request missing information when the task is ambiguous.' },
      { title: 'Protect sensitive data', body: 'Do not paste private, confidential, regulated, or credential-like information into a prompt unless your workflow explicitly allows it.' },
      { title: 'No accuracy guarantee', body: 'This independent prompt drafting tool is not affiliated with OpenAI or ChatGPT and does not guarantee accuracy, safety, compliance, or output quality.' }]},
  'bio-generator': {
    howTo: [
      "Enter the bio details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the bio output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'cursive-text-generator': {
    howTo: [
      "Enter the cursive text details you need, including text, destination app, readability need, style.",
      "Generate a few options and compare which one best fits short text, profile lines, captions, labels.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the cursive text output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to short text, profile lines, captions, labels." }]},
  'fancy-text-generator': {
    howTo: [
      "Enter the fancy text details you need, including text, destination app, readability need, style.",
      "Generate a few options and compare which one best fits short text, profile lines, captions, labels.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the fancy text output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to short text, profile lines, captions, labels." }]},
  'call-to-action-generator': {
    howTo: [
      "Enter the call to action details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the call to action output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'fake-text-generator': {
    howTo: [
      "Enter the sample placeholder text details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the sample placeholder text output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'geo-tag-generator': {
    howTo: [
      "Enter the geo tag details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the geo tag output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'iupac-name-generator': {
    howTo: [
      "Enter the iupac name details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the iupac name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'middle-name-generator': {
    howTo: [
      "Enter the middle name details you need, including audience, style, length, tone.",
      "Generate a few options and compare which one best fits profiles, characters, naming lists, screen names.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the middle name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to profiles, characters, naming lists, screen names." }]},
  'mock-api-generator': {
    howTo: [
      "Enter the mock api details you need, including input format, target environment, rules, examples.",
      "Generate a few options and compare which one best fits developer notes, test data, config examples, API drafts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review syntax, privacy, and project requirements before using the result in a real system."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the mock api output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to developer notes, test data, config examples, API drafts." }]},
  'morse-code-generator': {
    howTo: [
      "Enter the morse code details you need, including input format, target environment, rules, examples.",
      "Generate a few options and compare which one best fits developer notes, test data, config examples, API drafts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review syntax, privacy, and project requirements before using the result in a real system."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the morse code output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to developer notes, test data, config examples, API drafts." }]},
  'movie-name-generator': {
    howTo: [
      "Enter the movie name details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the movie name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'multiple-choice-generator': {
    howTo: [
      "Enter the multiple choice question details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the multiple choice question output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'name-generator-wheel': {
    howTo: [
      "Enter the name generator wheel details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the name generator wheel output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'name-tag-generator': {
    howTo: [
      "Enter the name tag details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the name tag output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'nickname-generator': {
    howTo: [
      "Enter the nickname details you need, including audience, style, length, tone.",
      "Generate a few options and compare which one best fits profiles, characters, naming lists, screen names.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the nickname output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to profiles, characters, naming lists, screen names." }]},
  'npc-generator': {
    howTo: [
      "Enter the npc details you need, including genre, setting, tone, role.",
      "Generate a few options and compare which one best fits characters, campaign notes, maps, NPCs.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the npc output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, campaign notes, maps, NPCs." }]},
  'old-english-text-generator': {
    howTo: [
      "Enter the old english text details you need, including text, destination app, readability need, style.",
      "Generate a few options and compare which one best fits short text, profile lines, captions, labels.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the old english text output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to short text, profile lines, captions, labels." }]},
  'open-graph-generator': {
    howTo: [
      "Enter the open graph tag details you need, including page type, target keyword, audience, URL context.",
      "Generate a few options and compare which one best fits SEO drafts, metadata notes, content briefs, site checks.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review SEO drafts against your real page, search intent, and current site requirements before publishing."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the open graph tag output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to SEO drafts, metadata notes, content briefs, site checks." }]},
  'orc-name-generator': {
    howTo: [
      "Enter the orc name details you need, including genre, setting, tone, role.",
      "Generate a few options and compare which one best fits characters, campaign notes, maps, NPCs.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the orc name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, campaign notes, maps, NPCs." }]},
  'paragraph-generator': {
    howTo: [
      "Enter the paragraph details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the paragraph output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'passphrase-generator': {
    howTo: [
      "Enter the passphrase details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the passphrase output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'pattern-generator': {
    howTo: [
      "Enter the css pattern details you need, including input format, target environment, rules, examples.",
      "Generate a few options and compare which one best fits developer notes, test data, config examples, API drafts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review syntax, privacy, and project requirements before using the result in a real system."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the css pattern output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to developer notes, test data, config examples, API drafts." }]},
  'photography-name-generator': {
    howTo: [
      "Enter the photography business name details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the photography business name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'pirate-name-generator': {
    howTo: [
      "Enter the pirate name details you need, including genre, setting, tone, role.",
      "Generate a few options and compare which one best fits characters, campaign notes, maps, NPCs.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the pirate name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, campaign notes, maps, NPCs." }]},
  'planet-name-generator': {
    howTo: [
      "Enter the planet name details you need, including genre, setting, tone, role.",
      "Generate a few options and compare which one best fits characters, campaign notes, maps, NPCs.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the planet name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, campaign notes, maps, NPCs." }]},
  'podcast-name-generator': {
    howTo: [
      "Enter the podcast name details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the podcast name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'press-release-generator': {
    howTo: [
      "Enter the press release details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the press release output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'product-benefits-generator': {
    howTo: [
      "Enter the product benefits details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the product benefits output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'product-bullet-points-generator': {
    howTo: [
      "Enter the product bullet points details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the product bullet points output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'product-description-generator': {
    howTo: [
      "Enter the product description details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the product description output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'product-name-generator': {
    howTo: [
      "Enter the product name details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the product name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'product-title-generator': {
    howTo: [
      "Enter the product title details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the product title output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'project-name-generator': {
    howTo: [
      "Enter the project name details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the project name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'purchase-order-generator': {
    howTo: [
      "Enter the purchase order details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the purchase order output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'qr-code-text-generator': {
    howTo: [
      "Enter the qr code text details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the qr code text output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'quest-generator': {
    howTo: [
      "Enter the quest details you need, including genre, setting, tone, role.",
      "Generate a few options and compare which one best fits characters, campaign notes, maps, NPCs.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the quest output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, campaign notes, maps, NPCs." }]},
  'quiz-generator': {
    howTo: [
      "Enter the quiz question details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the quiz question output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'quotation-generator': {
    howTo: [
      "Enter the quotation details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the quotation output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'raffle-generator': {
    howTo: [
      "Enter the raffle details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the raffle output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'random-choice-generator': {
    howTo: [
      "Enter the random choice details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random choice output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'random-color-generator': {
    howTo: [
      "Enter the random color details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random color output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'random-country-generator': {
    howTo: [
      "Enter the random country details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random country output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'random-date-generator': {
    howTo: [
      "Enter the random date details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random date output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'random-emoji-generator': {
    howTo: [
      "Enter the random emoji details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random emoji output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'random-height-generator': {
    howTo: [
      "Enter the random height details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random height output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'random-id-generator': {
    howTo: [
      "Enter the random id details you need, including input format, target environment, rules, examples.",
      "Generate a few options and compare which one best fits developer notes, test data, config examples, API drafts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review syntax, privacy, and project requirements before using the result in a real system."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random id output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to developer notes, test data, config examples, API drafts." }]},
  'random-letter-generator': {
    howTo: [
      "Enter the random letter details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random letter output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'random-list-generator': {
    howTo: [
      "Enter the random list details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random list output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'random-phrase-generator': {
    howTo: [
      "Enter the random phrase details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random phrase output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'random-question-generator': {
    howTo: [
      "Enter the random question details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random question output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'random-text-generator': {
    howTo: [
      "Enter the random text details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random text output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'random-word-generator': {
    howTo: [
      "Enter the random word details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the random word output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'regex-generator': {
    howTo: [
      "Enter the regex task, target engine, examples that should match, and examples that should fail.",
      "Generate pattern options and compare flags, anchors, and character classes against your real sample data.",
      "Regenerate with narrower constraints if the pattern is too broad, too strict, or hard to maintain.",
      "Test the regex in your own environment before using it in validation, routing, or production code."],
    tips: [
      { title: "Use sample data", body: "Include valid and invalid examples so the regex draft has something concrete to target." },
      { title: "Check the engine", body: "Regex syntax can differ across JavaScript, PCRE, Python, databases, and form validators." },
      { title: "Prefer readable patterns", body: "Choose the simplest pattern that handles the important cases instead of a clever one nobody can maintain." },
      { title: "Test before use", body: "Run the pattern against edge cases and watch for overmatching, undermatching, and slow expressions." }]},
  'repeat-text-generator': {
    howTo: [
      "Enter the repeat text details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the repeat text output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'research-question-generator': {
    howTo: [
      "Enter the research question details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the research question output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'restaurant-name-generator': {
    howTo: [
      "Enter the restaurant name details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the restaurant name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'resume-summary-generator': {
    howTo: [
      "Enter the target role, seniority, skills, achievements, industry, and tone for the resume summary.",
      "Generate several drafts and compare which one fits the job description without overstating experience.",
      "Regenerate with narrower constraints if the summary sounds generic, inflated, or too long.",
      "Verify every skill, metric, credential, employer, and outcome before adding the summary to a resume."],
    tips: [
      { title: "Lead with truth", body: "Use only skills, achievements, and experience you can support in an application or interview." },
      { title: "Match the role", body: "Adjust keywords and emphasis to the job description while keeping the wording natural." },
      { title: "Stay concise", body: "A strong summary is usually a few focused lines, not a full career history." },
      { title: "Avoid inflated claims", body: "Remove unsupported metrics, vague superlatives, and credentials you do not actually hold." }]},
  'rgb-generator': {
    howTo: [
      "Enter the rgb color details you need, including input format, target environment, rules, examples.",
      "Generate a few options and compare which one best fits developer notes, test data, config examples, API drafts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review syntax, privacy, and project requirements before using the result in a real system."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the rgb color output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to developer notes, test data, config examples, API drafts." }]},
  'riddle-generator': {
    howTo: [
      "Enter the riddle details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the riddle output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'rpg-character-generator': {
    howTo: [
      "Enter the rpg character details you need, including genre, setting, tone, role.",
      "Generate a few options and compare which one best fits characters, campaign notes, maps, NPCs.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the rpg character output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, campaign notes, maps, NPCs." }]},
  'rubric-generator': {
    howTo: [
      "Enter the rubric details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the rubric output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'sales-email-generator': {
    howTo: [
      "Enter the offer, recipient type, relationship context, proof, CTA, tone, and outreach constraints.",
      "Generate draft options for cold outreach, warm leads, inbound replies, or renewals.",
      "Regenerate if the email sounds pushy, generic, too long, or unclear about the next step.",
      "Verify claims, personalization, consent, and applicable email rules before sending."],
    tips: [
      { title: "Be specific", body: "Use a truthful reason for reaching out instead of fake urgency or generic flattery." },
      { title: "Keep the ask clear", body: "Make the CTA easy to understand and easy to decline." },
      { title: "Verify every claim", body: "Check customer names, pricing, results, case studies, and product promises before sending." },
      { title: "Respect inbox rules", body: "Follow applicable consent, unsubscribe, and sender-identification requirements for your audience." }]},
  'salon-name-generator': {
    howTo: [
      "Enter the salon name details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the salon name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'schema-tag-generator': {
    howTo: [
      "Enter the schema markup details you need, including page type, target keyword, audience, URL context.",
      "Generate a few options and compare which one best fits SEO drafts, metadata notes, content briefs, site checks.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review SEO drafts against your real page, search intent, and current site requirements before publishing."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the schema markup output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to SEO drafts, metadata notes, content briefs, site checks." }]},
  'school-name-generator': {
    howTo: [
      "Enter the school name details you need, including genre, setting, tone, role.",
      "Generate a few options and compare which one best fits characters, campaign notes, maps, NPCs.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the school name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, campaign notes, maps, NPCs." }]},
  'sentence-generator': {
    howTo: [
      "Enter the sentence details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the sentence output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'seo-title-generator': {
    howTo: [
      "Enter the seo title details you need, including page type, target keyword, audience, URL context.",
      "Generate a few options and compare which one best fits SEO drafts, metadata notes, content briefs, site checks.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review SEO drafts against your real page, search intent, and current site requirements before publishing."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the seo title output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to SEO drafts, metadata notes, content briefs, site checks." }]},
  'shop-name-generator': {
    howTo: [
      "Enter the shop name details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the shop name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'sku-generator': {
    howTo: [
      "Enter the sku details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the sku output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'slogan-generator': {
    howTo: [
      "Enter the slogan details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the slogan output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'slug-generator': {
    howTo: [
      "Enter the url slug details you need, including input format, target environment, rules, examples.",
      "Generate a few options and compare which one best fits developer notes, test data, config examples, API drafts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review syntax, privacy, and project requirements before using the result in a real system."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the url slug output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to developer notes, test data, config examples, API drafts." }]},
  'snapchat-name-generator': {
    howTo: [
      "Enter the snapchat name details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the snapchat name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'social-media-post-generator': {
    howTo: [
      "Enter the social media post details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the social media post output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'song-name-generator': {
    howTo: [
      "Enter the song name details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the song name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'special-character-generator': {
    howTo: [
      "Enter the special character details you need, including text, destination app, readability need, style.",
      "Generate a few options and compare which one best fits short text, profile lines, captions, labels.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the special character output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to short text, profile lines, captions, labels." }]},
  'sql-query-generator': {
    howTo: [
      "Enter the database type, table name, columns, operation, filters, sorting, and expected output.",
      "Generate query drafts and compare the SELECT, INSERT, or UPDATE structure against your schema.",
      "Regenerate with narrower constraints if joins, filters, limits, or column names are unclear.",
      "Test on sample data and review permissions, backups, and WHERE clauses before running against real data."],
    tips: [
      { title: "Name the dialect", body: "Mention PostgreSQL, MySQL, SQLite, SQL Server, or another engine because syntax can differ." },
      { title: "Start read-only", body: "Use SELECT drafts for exploration before moving to INSERT, UPDATE, or destructive changes." },
      { title: "Check conditions", body: "For updates, inspect WHERE clauses, limits, transactions, and backups before running anything." },
      { title: "Protect data", body: "Do not paste private production data into prompts; use sample schemas and anonymized examples." }]},
  'stage-name-generator': {
    howTo: [
      "Enter the stage name details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the stage name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'startup-name-generator': {
    howTo: [
      "Enter the startup name details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the startup name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'story-name-generator': {
    howTo: [
      "Enter the story title details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the story title output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'story-plot-generator': {
    howTo: [
      "Enter the story plot details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the story plot output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'street-name-generator': {
    howTo: [
      "Enter the street name details you need, including genre, setting, tone, role.",
      "Generate a few options and compare which one best fits characters, campaign notes, maps, NPCs.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the street name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, campaign notes, maps, NPCs." }]},
  'study-plan-generator': {
    howTo: [
      "Enter the study plan details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the study plan output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'synonym-generator': {
    howTo: [
      "Enter the synonym details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the synonym output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'tag-cloud-generator': {
    howTo: [
      "Enter the tag cloud details you need, including page type, target keyword, audience, URL context.",
      "Generate a few options and compare which one best fits SEO drafts, metadata notes, content briefs, site checks.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review SEO drafts against your real page, search intent, and current site requirements before publishing."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the tag cloud output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to SEO drafts, metadata notes, content briefs, site checks." }]},
  'tagline-generator': {
    howTo: [
      "Enter the tagline details you need, including audience, offer, industry, tone.",
      "Generate a few options and compare which one best fits brand drafts, business notes, client examples, positioning ideas.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Check claims, availability, trademarks, and local requirements before using the draft publicly."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the tagline output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to brand drafts, business notes, client examples, positioning ideas." }]},
  'tavern-name-generator': {
    howTo: [
      "Enter the tavern name details you need, including genre, setting, tone, role.",
      "Generate a few options and compare which one best fits characters, campaign notes, maps, NPCs.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the tavern name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, campaign notes, maps, NPCs." }]},
  'testimonial-generator': {
    howTo: [
      "Enter the product, audience, real feedback notes, format, and permission status for the testimonial draft.",
      "Generate request prompts, editing frameworks, or clearly labeled placeholders for collecting real feedback.",
      "Regenerate if the wording adds claims, results, or details that the customer did not provide.",
      "Publish only truthful customer feedback with permission and any disclosures your context requires."],
    tips: [
      { title: "Do not fake reviews", body: "Generated wording must not be published as a real customer testimonial unless it reflects real feedback." },
      { title: "Preserve meaning", body: "When editing customer words, keep the original meaning intact and confirm approval when needed." },
      { title: "Avoid unsupported claims", body: "Remove invented metrics, results, names, dates, or endorsements." },
      { title: "Label placeholders", body: "Keep sample or user-fill labels visible until verified customer feedback replaces them." }]},
  'text-shadow-generator': {
    howTo: [
      "Enter the css text shadow details you need, including input format, target environment, rules, examples.",
      "Generate a few options and compare which one best fits developer notes, test data, config examples, API drafts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review syntax, privacy, and project requirements before using the result in a real system."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the css text shadow output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to developer notes, test data, config examples, API drafts." }]},
  'text-summary-generator': {
    howTo: [
      "Enter the text summary details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the text summary output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'text-to-binary-generator': {
    howTo: [
      "Enter the text to binary details you need, including input format, target environment, rules, examples.",
      "Generate a few options and compare which one best fits developer notes, test data, config examples, API drafts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review syntax, privacy, and project requirements before using the result in a real system."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the text to binary output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to developer notes, test data, config examples, API drafts." }]},
  'thesis-statement-generator': {
    howTo: [
      "Enter the thesis statement details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the thesis statement output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'tiefling-name-generator': {
    howTo: [
      "Enter the tiefling name details you need, including genre, setting, tone, role.",
      "Generate a few options and compare which one best fits characters, campaign notes, maps, NPCs.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the tiefling name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, campaign notes, maps, NPCs." }]},
  'town-name-generator': {
    howTo: [
      "Enter the town name details you need, including genre, setting, tone, role.",
      "Generate a few options and compare which one best fits characters, campaign notes, maps, NPCs.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the town name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to characters, campaign notes, maps, NPCs." }]},
  'truth-or-dare-generator': {
    howTo: [
      "Enter the truth or dare details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the truth or dare output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'twitch-name-generator': {
    howTo: [
      "Enter the twitch name details you need, including audience, purpose, tone, format.",
      "Generate a few options and compare which one best fits drafts, planning notes, examples, templates.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the twitch name output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to drafts, planning notes, examples, templates." }]},
  'typescript-type-generator': {
    howTo: [
      "Enter the typescript type details you need, including input format, target environment, rules, examples.",
      "Generate a few options and compare which one best fits developer notes, test data, config examples, API drafts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review syntax, privacy, and project requirements before using the result in a real system."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the typescript type output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to developer notes, test data, config examples, API drafts." }]},
  'typography-generator': {
    howTo: [
      "Enter the typography details you need, including text, destination app, readability need, style.",
      "Generate a few options and compare which one best fits short text, profile lines, captions, labels.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the typography output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to short text, profile lines, captions, labels." }]},
  'underline-text-generator': {
    howTo: [
      "Enter the underline text details you need, including text, destination app, readability need, style.",
      "Generate a few options and compare which one best fits short text, profile lines, captions, labels.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review names, facts, originality, and audience fit before publishing or reusing the result."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the underline text output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to short text, profile lines, captions, labels." }]},
  'utm-generator': {
    howTo: [
      "Enter the utm link details you need, including page type, target keyword, audience, URL context.",
      "Generate a few options and compare which one best fits SEO drafts, metadata notes, content briefs, site checks.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review SEO drafts against your real page, search intent, and current site requirements before publishing."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the utm link output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to SEO drafts, metadata notes, content briefs, site checks." }]},
  'uuid-generator': {
    howTo: [
      "Enter the uuid details you need, including input format, target environment, rules, examples.",
      "Generate a few options and compare which one best fits developer notes, test data, config examples, API drafts.",
      "Regenerate with narrower constraints if the first pass feels generic, too long, or off-tone.",
      "Review syntax, privacy, and project requirements before using the result in a real system."],
    tips: [
      { title: "Use real context", body: "Mention the audience, purpose, and practical constraints so the uuid output matches the situation." },
      { title: "Keep it usable", body: "Favor clear wording that can be adapted without extra cleanup." },
      { title: "Compare before choosing", body: "Generate multiple drafts, then combine the strongest parts instead of accepting the first result." },
      { title: "Review the details", body: "Check accuracy, originality, tone, and any rules that apply to developer notes, test data, config examples, API drafts." }]}};

const batch7GuideSlugs = new Set([
  'fantasy-language-generator', 'fantasy-name-generator', 'farm-name-generator', 'glitch-text-generator', 'ipa-generator',
  'italic-text-generator', 'last-name-generator', 'lorem-ipsum-generator', 'meta-tag-generator', 'minutes-of-meeting-generator',
  'name-generator', 'name-pronunciation-generator', 'newspaper-name-generator', 'papyrus-generator', 'pet-tag-generator',
  'pick-a-name-generator', 'price-tag-generator', 'product-tag-generator', 'random-number-generator', 'reverse-text-generator',
  'robots-txt-generator', 'serif-generator', 'small-text-generator', 'strikethrough-text-generator', 'superhero-name-generator',
  'tag-team-name-generator', 'team-name-generator', 'text-case-converter', 'title-name-generator', 'unicode-text-generator',
  'vaporwave-text-generator', 'villain-name-generator', 'warrior-name-generator', 'word-counter'
]);

function batch7GuideCopyFor(tool: Tool): { howTo: string[]; tips: { title: string; body: string }[] } {
  const topic = tool.primaryKeyword;
  const context = tool.description.split('.')[0].toLowerCase();
  return {
    howTo: [
      `Enter the ${topic} details you need, including audience, style, tone, and any constraints.`,
      `Generate a few options, then compare which result best fits ${context}.`,
      'Regenerate with narrower details if the first set feels too broad, generic, long, or off-tone.',
      'Edit the final result and review spelling, facts, originality, claims, and any platform or project rules before using it.'],
    tips: [
      { title: 'Add useful context', body: `Mention the real use case, audience, format, tone, and must-include or avoid terms so ${tool.name} results feel specific.` },
      { title: 'Compare options', body: 'Look for wording that is clear, adaptable, and appropriate for the place where you will use it.' },
      { title: 'Keep it practical', body: 'Short, readable outputs are usually easier to copy, edit, remember, and fit into a real project.' },
      { title: 'Review before publishing', body: 'Check accuracy, originality, formatting, claims, and relevant platform or project rules before public use.' }]
  };
}


export function getNoindexSafetyProfile(toolSlug: string) {
  const noindexRiskType = noindexToolSlugs.has(toolSlug) ? noindexRiskTypeFor(toolSlug) : null;
  return noindexRiskType ? noindexSafetyCopy[noindexRiskType] : null;
}

export function getEffectiveGuideCopy(tool: Tool): { howTo: string[]; tips: { title: string; body: string }[] } | null {
  return premiumGuideCopy[tool.slug] ?? (batch7GuideSlugs.has(tool.slug) ? batch7GuideCopyFor(tool) : null);
}
