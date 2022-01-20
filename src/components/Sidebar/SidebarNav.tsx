import { Stack } from '@chakra-ui/react'
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine
} from 'react-icons/ri'

import { NavLink } from './NavLink'
import { NavSection } from './NavSection'

export const SidebarNav = () => {
  return (
    <Stack align="flex-start" spacing="12">
      <NavSection title="GERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>Dashboard</NavLink>
        <NavLink href="/users" icon={RiContactsLine}>Usuários</NavLink>
      </NavSection>

      <NavSection title="AUTOMAÇÃO">
        <NavLink href="/" icon={RiInputMethodLine}>Formulários</NavLink>
        <NavLink href="/" icon={RiGitMergeLine}>Automação</NavLink>
      </NavSection>
    </Stack>
  )
}