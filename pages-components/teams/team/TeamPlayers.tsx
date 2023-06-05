export const TeamPlayers = () => <div />;

// import { Button, Divider, Group, LoadingOverlay, Modal, Paper, TextInput, Title, Text } from '@mantine/core';
// import { useHotkeys } from '@mantine/hooks';
// import { Player, filter, getPlayerPosition, positionOrder } from 'ftb-models';
// import { useRef, useState } from 'react';
// import { Search as SearchIcon } from 'tabler-icons-react';
// import s from './TeamPlayers.module.scss';
// import { PlayerForm } from '@pages-components/player/PlayerForm';
// import Link from 'next/link';
// import { usePlayersDataStore } from '@store/data/players.data.store';
// import { TeamPlayersTable } from '@pages-components/teams/team/TeamPlayersTable';
// import { showNotification } from '@mantine/notifications';
// import { useTransfersDataStore } from '@store/data/transfers.data.store';
// import { useUserUiStore } from '@store/ui/user.ui.store';
// import { useTeamsDataStore } from '@store/data/teams.data.store';
// import { observer } from 'mobx-react-lite';
// import sortBy from 'lodash-es/sortBy';
//
// export const TeamPlayers = observer(({ teamId }: { teamId: number }) => {
//   const [query, setQuery] = useState<string>('');
//   const [newPlayerModalOpened, setNewPlayerModalOpened] = useState<boolean>(false);
//   const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
//   const [operationInProgress, setOperationInProgress] = useState(false);
//   const playerDataStore = usePlayersDataStore();
//   const transferDataSotre = useTransfersDataStore();
//   const userUiStore = useUserUiStore();
//   const playerForm = useRef();
//   const teamsDataStore = useTeamsDataStore();
//   const team = teamsDataStore.teams[teamId];
//
//   useHotkeys([['ctrl+A', () => setNewPlayerModalOpened(true)]]);
//
//   const createPlayer = async v => {
//     if (!v) return;
//     setOperationInProgress(true);
//     try {
//       v.league = userUiStore.u?.league;
//       v.teams = [team];
//       const request = await playerDataStore.createPlayer(v);
//       await transferDataSotre.approveTransfer(request);
//     } catch (e) {
//       console.error(e);
//       const message = e.json ? (await e.json()).error : 'players creation failed';
//       showNotification({ message, color: 'red' });
//     }
//     setNewPlayerModalOpened(false);
//     setOperationInProgress(false);
//   };
//
//   const editPlayer = async v => {
//     if (!v) return;
//     setOperationInProgress(true);
//     try {
//       v._id = selectedPlayer._id;
//       v.league = team.league;
//       await playerDataStore.editPlayer(v);
//     } catch (e) {
//       console.log(e);
//       const message = e.json ? (await e.json()).error : 'players edit failed';
//       showNotification({ message, color: 'red' });
//     }
//     setSelectedPlayer(null);
//     setOperationInProgress(false);
//   };
//
//   const positionIndex = (player: Player) => {
//     const pos = getPlayerPosition(player.position) + 's';
//     return positionOrder.findIndex(p => p == pos);
//   };
//   const players = team?.players ? sortBy(filter(team.players, query, ['firstName', 'lastName', 'middleName']), [positionIndex, 'number']) : null;
//
//   return (
//     <Paper withBorder px={'sm'} my={'md'} className={s.players}>
//       <Group position={'apart'} py={'md'}>
//         <Title order={4}>
//           Players
//           {team?.players?.length > 0 && ` (${team.players?.length})`}
//         </Title>
//         <Button onClick={() => setNewPlayerModalOpened(true)} size={'xs'}>
//           Add player (Ctrl + A)
//         </Button>
//       </Group>
//
//       <Divider variant={'dashed'} />
//
//       <TextInput icon={<SearchIcon size={14} />} placeholder={'Search'} my={'xs'} style={{ flex: 1 }} onChange={e => setQuery(e.currentTarget.value)} />
//
//       <Divider variant={'dashed'} mb={'sm'} />
//
//       <TeamPlayersTable players={players} onPlayerClick={setSelectedPlayer} teamId={teamId} />
//
//       <Modal centered opened={newPlayerModalOpened} onClose={() => setNewPlayerModalOpened(false)} title={'Create new players'} overflow={'inside'}>
//         <LoadingOverlay visible={operationInProgress} />
//         <PlayerForm ref={playerForm} player={selectedPlayer} />
//         <Group>
//           <Button fullWidth onClick={() => createPlayer(playerForm.current.getValue())}>
//             Create player
//           </Button>
//         </Group>
//       </Modal>
//
//       <Modal centered opened={Boolean(selectedPlayer)} onClose={() => setSelectedPlayer(null)} title={'Edit players info'} overflow={'inside'}>
//         <LoadingOverlay visible={operationInProgress} />
//         <PlayerForm ref={playerForm} playerId={selectedPlayer?._id} />
//         <Divider variant={'dashed'} mt={'lg'} />
//         <Group position={'apart'} mt={'lg'}>
//           {selectedPlayer && (
//             <Link href={'/players/' + selectedPlayer._id}>
//               <Text size={'sm'}>To player profile</Text>
//             </Link>
//           )}
//           <Button onClick={() => editPlayer(playerForm.current.getValue())}>Edit player</Button>
//         </Group>
//       </Modal>
//     </Paper>
//   );
// });
