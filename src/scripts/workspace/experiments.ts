import { triggerExposure, getVariant } from '../../lib/ab-testing';
import { trackExperimentConversion, trackExperimentComplete } from '../../lib/analytics';

export function runClientExperiments(toolSlug: string) {
  if (typeof window === 'undefined' || typeof document === 'undefined' || typeof document.createElement !== 'function') return;

  // 1. Hero Section Experiment
  const heroSection = document.querySelector('.tool-page-header');
  if (heroSection) {
    const variant = triggerExposure('hero_layout_experiment', toolSlug);
    const h1 = heroSection.querySelector('h1');
    const p = heroSection.querySelector('p');

    if (variant === 'benefit_first' && h1 && p) {
      h1.textContent = 'Supercharge Your Social Media Bios & Captions Instantly';
      p.textContent = 'Convert plain text to 50+ aesthetic Unicode fonts and text styles. Free, instant, and works in your browser.';
    } else if (variant === 'outcome_proof' && h1 && p) {
      h1.textContent = 'Create Eye-Catching Fonts & Bios For Any Platform';
      p.textContent = 'Copy and paste stylish fonts directly into Instagram, TikTok, and Twitter.';
      
      // Social proof badge
      const badge = document.createElement('div');
      badge.className = 'ab-social-proof-badge';
      badge.style.cssText = 'display: inline-flex; align-items: center; gap: 4px; font-size: 0.75rem; background: rgba(56,189,248,0.1); color: #38bdf8; border: 1px solid rgba(56,189,248,0.2); padding: 4px 8px; border-radius: 9999px; margin-top: 8px; font-weight: 600;';
      badge.innerHTML = '⭐ 5.0 (10,000+ creators served)';
      heroSection.appendChild(badge);
    }

    // Track hero impression
    trackExperimentConversion('hero_layout_experiment', variant, 'hero_impression', toolSlug);

    // Track conversion click on example chips or text input focus
    const exampleChips = document.querySelectorAll('.example-chip');
    exampleChips.forEach(chip => {
      chip.addEventListener('click', () => {
        trackExperimentConversion('hero_layout_experiment', variant, 'hero_cta_click', toolSlug);
      });
    });

    const toolInput = document.getElementById('tool-input');
    toolInput?.addEventListener('focus', () => {
      trackExperimentConversion('hero_layout_experiment', variant, 'hero_cta_click', toolSlug);
    }, { once: true });
  }

  // 2. CTA Button Wording Experiment
  const generateBtn = document.getElementById('generate-btn');
  if (generateBtn) {
    const variant = triggerExposure('cta_buttons_experiment', toolSlug);
    if (variant === 'create') {
      generateBtn.textContent = 'Create';
    } else if (variant === 'generate_now') {
      generateBtn.textContent = 'Generate Now';
    } else if (variant === 'create_instantly') {
      generateBtn.textContent = 'Create Instantly';
    }

    generateBtn.addEventListener('click', () => {
      trackExperimentConversion('cta_buttons_experiment', variant, 'cta_click', toolSlug);
      trackExperimentConversion('hero_layout_experiment', getVariant('hero_layout_experiment'), 'generate_click', toolSlug);
      trackExperimentComplete('cta_buttons_experiment', variant, toolSlug);
    });
  }

  // 3. Related Tools Placement Experiment
  const relatedSection = document.querySelector('.content-section.premium-content-section section:nth-of-type(5)') as HTMLElement 
                     || document.querySelector('.content-section.premium-content-section .category-grid')?.parentElement as HTMLElement;
  const workspace = document.getElementById('tool-workspace');
  
  if (relatedSection && workspace) {
    const variant = triggerExposure('related_tools_experiment', toolSlug);
    
    if (variant === 'below_output') {
      workspace.parentNode?.insertBefore(relatedSection, workspace.nextSibling);
      relatedSection.style.marginTop = '24px';
    } else if (variant === 'sticky_sidebar') {
      const container = document.querySelector('.tool-page .container');
      if (container) {
        container.classList.add('ab-sidebar-layout');
        const style = document.createElement('style');
        style.textContent = `
          @media (min-width: 1024px) {
            .ab-sidebar-layout {
              display: grid;
              grid-template-columns: 1fr 300px;
              gap: 24px;
              align-items: start;
            }
            .ab-sidebar-layout .content-section {
              grid-column: 1 / -1;
            }
            .ab-sidebar-layout #tool-workspace {
              grid-column: 1;
            }
            .ab-sidebar-layout .ab-sticky-sidebar {
              grid-column: 2;
              position: sticky;
              top: 24px;
              background: var(--color-bg-secondary);
              border: 1px solid var(--color-border);
              padding: 16px;
              border-radius: 12px;
            }
          }
        `;
        document.head.appendChild(style);
        relatedSection.classList.add('ab-sticky-sidebar');
        workspace.parentNode?.insertBefore(relatedSection, workspace.nextSibling);
      }
    }

    // Track clicks to calculate related CTR
    relatedSection.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        trackExperimentConversion('related_tools_experiment', variant, 'related_tool_click', toolSlug);
        trackExperimentComplete('related_tools_experiment', variant, toolSlug);
      });
    });
  }

  // 4. Examples Display Experiment
  const exampleRow = document.querySelector('.example-chip-row') as HTMLElement;
  if (exampleRow) {
    const variant = triggerExposure('examples_experiment', toolSlug);
    
    if (variant === 'collapsed') {
      exampleRow.style.display = 'none';
      const toggle = document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'btn btn-ghost';
      toggle.style.cssText = 'margin-bottom: 12px; font-size: 0.8rem; padding: 4px 8px; min-height: 28px;';
      toggle.textContent = '💡 View Examples';
      
      toggle.addEventListener('click', () => {
        exampleRow.style.display = 'flex';
        toggle.remove();
        trackExperimentConversion('examples_experiment', variant, 'example_viewed', toolSlug);
      });
      exampleRow.parentNode?.insertBefore(toggle, exampleRow);
    } else if (variant === 'interactive') {
      exampleRow.querySelectorAll('.example-chip').forEach(chip => {
        const c = chip as HTMLElement;
        c.style.position = 'relative';
        c.style.cursor = 'pointer';
        c.style.transition = 'all 0.2s';
        
        c.addEventListener('mouseenter', () => {
          c.style.transform = 'translateY(-2px)';
          c.style.borderColor = 'var(--color-accent-1)';
        });
        c.addEventListener('mouseleave', () => {
          c.style.transform = 'none';
          c.style.borderColor = 'var(--color-border)';
        });

        c.addEventListener('click', () => {
          trackExperimentConversion('examples_experiment', variant, 'example_click', toolSlug);
          trackExperimentComplete('examples_experiment', variant, toolSlug);
        });
      });
    }
  }

  // 5. Output Cards Layout Experiment
  const output = document.getElementById('tool-output');
  if (output) {
    const variant = triggerExposure('output_cards_experiment', toolSlug);
    
    // Inject stylesheet for card experiments to avoid layout shift
    const style = document.createElement('style');
    style.textContent = `
      .large-copy-btn {
        padding: 8px 16px !important;
        font-size: 0.9rem !important;
        background: var(--color-accent-1) !important;
        color: white !important;
      }
      .always-visible-btn {
        opacity: 1 !important;
        visibility: visible !important;
      }
    `;
    document.head.appendChild(style);

    const observer = new MutationObserver(() => {
      observer.disconnect();

      const cards = output.querySelectorAll('.intent-style-card, .result-card');
      cards.forEach(card => {
        const copyBtn = card.querySelector('.copy-btn');
        const favBtn = card.querySelector('.fav-btn');

        if (variant === 'large_copy' && copyBtn) {
          copyBtn.classList.add('large-copy-btn');
        } else if (variant === 'always_visible') {
          if (copyBtn) copyBtn.classList.add('always-visible-btn');
          if (favBtn) favBtn.classList.add('always-visible-btn');
        }

        // Hook click handlers to track conversions
        copyBtn?.addEventListener('click', () => {
          trackExperimentConversion('output_cards_experiment', variant, 'copy_clicked', toolSlug);
          trackExperimentComplete('output_cards_experiment', variant, toolSlug);
        }, { once: true });

        favBtn?.addEventListener('click', () => {
          trackExperimentConversion('output_cards_experiment', variant, 'fav_clicked', toolSlug);
          trackExperimentComplete('output_cards_experiment', variant, toolSlug);
        }, { once: true });
      });

      observer.observe(output, { childList: true, subtree: true });
    });

    observer.observe(output, { childList: true, subtree: true });
  }

  // Inject Active Badges / Development Panel if in development
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    injectActiveBadges(toolSlug);
  }
}

function injectActiveBadges(toolSlug: string) {
  const badgeContainer = document.createElement('div');
  badgeContainer.className = 'ab-active-badges';
  badgeContainer.style.cssText = 'position: fixed; top: 12px; left: 12px; z-index: 9999; display: flex; flex-direction: column; gap: 6px; pointer-events: none;';
  
  const experiments = ['hero_layout_experiment', 'cta_buttons_experiment', 'related_tools_experiment', 'examples_experiment', 'output_cards_experiment'];
  experiments.forEach(id => {
    const variant = getVariant(id);
    const badge = document.createElement('span');
    badge.style.cssText = 'background: rgba(16,185,129,0.9); color: white; padding: 4px 8px; border-radius: 4px; font-family: monospace; font-size: 10px; font-weight: bold; border: 1px solid #10b981;';
    badge.textContent = `🧪 ${id}: ${variant}`;
    badgeContainer.appendChild(badge);
  });

  document.body.appendChild(badgeContainer);
}
