import {
  selectHelpActive,
  selectMode,
  setHelpActive,
  toggleHelp,
  useGameStore,
} from '@entities/game'
import { getHelpSections } from '../../lib'
import * as C from './HelpControl.components'

export const HelpControl = () => {
  const helpActive = useGameStore(selectHelpActive)
  const mode = useGameStore(selectMode)
  const sections = getHelpSections(mode)

  return (
    <>
      {helpActive && (
        <C.Backdrop
          type="button"
          aria-label="Close tips"
          onClick={() => setHelpActive(false)}
        />
      )}
      <C.Root>
        <C.Fab
          type="button"
          $active={helpActive}
          aria-pressed={helpActive}
          aria-label={helpActive ? 'Hide tips' : 'Show tips'}
          onClick={() => toggleHelp()}
        >
          <C.FabMark>?</C.FabMark>
        </C.Fab>
        {helpActive && (
          <C.Panel aria-live="polite">
            <C.PanelTitle>Tips</C.PanelTitle>
            {sections.map((section) => (
              <C.Section key={section.title}>
                <C.SectionTitle>{section.title}</C.SectionTitle>
                <C.List>
                  {section.items.map((item) => (
                    <C.Item key={`${section.title}-${item.label}`}>
                      <C.Label>{item.label}</C.Label>
                      <C.Text>{item.text}</C.Text>
                    </C.Item>
                  ))}
                </C.List>
              </C.Section>
            ))}
          </C.Panel>
        )}
      </C.Root>
    </>
  )
}
