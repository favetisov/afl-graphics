import { Language } from '@/shared/schema/src/models/helper-models/language';

export class Plural {
  private readonly forms: [string, string, string];

  constructor(private lang: Language, one: string, two?: string, many?: string) {
    this.forms = [one, two || one, many || two || one];
  }

  getForm(number: number) {
    return plural[this.lang](number, this.forms);
  }
}

export type LangBlock = { [Language.default]: string } & {
  [L in Language]?: string | string[] | Plural;
};

export const plural = {
  [Language.en]: (number: number, forms: [string, string, string]) => {
    const n = Math.abs(number);
    return n === 1 ? forms[0] : forms[1];
  },

  [Language.ru]: (number: number, forms: [string, string, string]) => {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return forms[2];
    }
    n %= 10;
    if (n === 1) {
      return forms[0];
    }
    if (n >= 2 && n <= 4) {
      return forms[1];
    }
    return forms[2];
  },
};

export const translations = {
  alert: {
    result_added: {
      [Language.en]: 'Result added',
      [Language.ru]: 'Добавлен результат',
      [Language.th]: 'เพิ่มผลลัพธ์แล้ว',
    },
    date_set: {
      [Language.en]: 'Date set',
      [Language.ru]: 'Установлена дата',
      [Language.th]: 'ตั้งวันที่แล้ว',
    },
    article_published: {
      [Language.en]: 'New article',
      [Language.ru]: 'Новая статья',
      [Language.th]: 'บทความใหม่',
    },
    photo_added: {
      [Language.en]: 'Photoset added',
      [Language.ru]: 'Добавлен фотоотчёт',
      [Language.th]: 'เพิ่มชุดรูปภาพแล้ว',
    },
    video_added: {
      [Language.en]: 'Video added',
      [Language.ru]: 'Добавлено видео',
      [Language.th]: 'เพิ่มวิดิโอแล้ว',
    },
    wishes_open: {
      [Language.en]: 'Wishes reception is open',
      [Language.ru]: 'Открыт приём пожеланий',
      [Language.th]: 'เปิดรับความปราถนา',
    },
    transfer_confirmed: {
      [Language.en]: 'Transfer confirmed',
      [Language.ru]: 'Переход подтверждён',
      [Language.th]: 'ยืนยันการโอน',
    },
  },
  role: {
    operator: {
      [Language.en]: 'Operator',
      [Language.ru]: 'Оператор',
      [Language.th]: 'โอเปอเรเตอร์',
    },
    operators: {
      [Language.en]: 'Operators',
      [Language.ru]: 'Операторы',
      [Language.th]: 'โอเปอเรเตอร์',
    },
    photographer: {
      [Language.en]: 'Photographer',
      [Language.ru]: 'Фотограф',
      [Language.th]: 'ช่างภาพ',
    },
    photographers: {
      [Language.en]: 'Photographers',
      [Language.ru]: 'Фотографы',
      [Language.th]: 'ช่างภาพ',
    },
    referee: {
      [Language.en]: 'Referee',
      [Language.ru]: 'Судья',
      [Language.th]: 'กรรมการ',
    },
    referees: {
      [Language.en]: 'Referees',
      [Language.ru]: 'Судьи',
      [Language.th]: 'กรรมการ',
    },
    journalist: {
      [Language.en]: 'Journalist',
      [Language.ru]: 'Журналист',
      [Language.th]: 'นักข่าว',
    },
    doctor: {
      [Language.en]: 'Doctor',
      [Language.ru]: 'Доктор',
      [Language.th]: 'แพทย์',
    },
    games_served: {
      [Language.en]: 'Games Served',
      [Language.ru]: 'Игр обслужено',
      [Language.th]: 'เกมเสิร์ฟ',
    },
    avg_mark: {
      [Language.en]: 'Average mark',
      [Language.ru]: 'Средняя оценка',
      [Language.th]: 'จุดเฉลี่ย',
    },
    head: {
      [Language.en]: 'League head',
      [Language.ru]: 'Средняя оценка',
      [Language.th]: 'หัวหน้าลีก',
    },
    levels: {
      captain: {
        [Language.en]: 'Captain',
        [Language.ru]: 'Капитан',
        [Language.th]: 'กัปตัน',
      },
      head: {
        [Language.en]: 'League head',
        [Language.ru]: 'Глава лиги',
        [Language.th]: 'หัวหน้าลีก',
      },
      root: {
        [Language.en]: 'Root',
        [Language.ru]: 'Root',
      },
      inspector: {
        [Language.en]: 'Inspector',
        [Language.ru]: 'Инспектор',
        [Language.th]: 'ผู้ตรวจการ',
      },
      administrator: {
        [Language.en]: 'Administrator',
        [Language.ru]: 'Администратор',
        [Language.th]: 'ผู้ดูแลระบบ',
      },
      referee: {
        [Language.en]: 'Referee',
        [Language.ru]: 'Судья',
        [Language.th]: 'กรรมการ',
      },
      journalist: {
        [Language.en]: 'Journalist',
        [Language.ru]: 'Журналист',
        [Language.th]: 'นักข่าว',
      },
      operator: {
        [Language.en]: 'Operator',
        [Language.ru]: 'Оператор',
        [Language.th]: 'โอเปอเรเตอร์',
      },
      photographer: {
        [Language.en]: 'Photographer',
        [Language.ru]: 'Фотограф',
        [Language.th]: 'ช่างภาพ',
      },
    },
  },
  staff: {
    [Language.en]: 'Staff',
    [Language.ru]: 'Персонал',
    [Language.th]: 'พนักงาน',
  },
  no_staff_assigned: {
    [Language.en]: 'No staff assigned to game',
    [Language.ru]: 'Персонал на матч не назначен',
  },
  game: {
    games: {
      [Language.en]: 'Games',
      [Language.ru]: 'Игры',
      [Language.th]: 'เกมส์',
    },
    matches: {
      [Language.en]: 'Games',
      [Language.ru]: 'Матчи',
      [Language.th]: 'เกมส์',
    },
    all_matches: {
      [Language.ru]: 'Всего игр',
      [Language.en]: 'Games total',
    },
    game: {
      [Language.en]: new Plural(Language.en, 'game', 'games'),
      [Language.ru]: new Plural(Language.ru, 'матч', 'матча', 'матчей'),
      [Language.th]: new Plural(Language.th, 'เกมส์', 'เกมส์', 'เกมส์'),
    },
    game_state: {
      [Language.ru]: 'Статус игры',
      [Language.en]: 'Game state',
      [Language.th]: 'สถานะเกมส์',
    },
    game_finished: {
      [Language.ru]: 'Завершённые игры',
      [Language.en]: 'Finished игры',
      [Language.th]: 'จบเกมส์',
    },
    game_not_started: {
      [Language.ru]: 'Не сыгранные игры',
      [Language.en]: 'Not played games',
      [Language.th]: 'เกมส์ยังไม่เริ่ม',
    },
    search_by_game_teams: {
      [Language.en]: 'Search by teams in game',
      [Language.ru]: 'Поиск по командам в игре',
      [Language.th]: 'ค้นหาจากทีมในเกมส์',
    },
    date: {
      [Language.en]: 'Date',
      [Language.ru]: 'Дата',
      [Language.th]: 'วันที่',
    },
    date_not_set: {
      [Language.en]: 'Date not set',
      [Language.ru]: 'Дата не установлена',
      [Language.th]: 'ยังไม่ตั้งค่าวันที่',
    },
    date_not_known: {
      [Language.ru]: 'Дата не задана',
      [Language.en]: 'Date not set',
    },
    stadium_not_set: {
      [Language.en]: 'Stadium not set',
      [Language.ru]: 'Стадион не назначен',
      [Language.th]: 'ยังไม่ได้เลือกสนาม',
    },
    upcoming: {
      [Language.en]: 'Upcoming',
      [Language.ru]: 'Грядущие',
      [Language.th]: 'เร็วๆนี้',
    },
    upcoming_games: {
      [Language.en]: 'Upcoming games',
      [Language.ru]: 'Ближайшие игры',
      [Language.th]: 'เกมส์ใหม่เร็วๆนี้',
    },
    last_games: {
      [Language.ru]: 'Последние игры',
      [Language.en]: 'Last games',
    },
    played: {
      [Language.en]: 'Results',
      [Language.ru]: 'Результаты',
      [Language.th]: 'ผลลัพธ์',
    },
    calendar: {
      [Language.en]: 'Calendar',
      [Language.ru]: 'Календарь',
      [Language.th]: 'ปฏิทิน',
    },
    full_calendar: {
      [Language.en]: 'Full Calendar',
      [Language.ru]: 'Полный календарь',
      [Language.th]: 'ปฏิทิน',
    },
    all_games: {
      [Language.en]: 'All games',
      [Language.ru]: 'Все игры',
      [Language.th]: 'เกมส์ทั้งหมด',
    },
    give_pass: {
      [Language.ru]: 'Пас отдал',
      [Language.en]: 'Assist from',
    },
    wins: {
      [Language.ru]: 'Победы',
      [Language.en]: 'Wins',
      [Language.th]: 'ชนะ',
    },
    tech_wins: {
      [Language.ru]: 'Технические победы',
      [Language.en]: 'Tech defeats',
    },
    draws: {
      [Language.ru]: 'Ничьи',
      [Language.en]: 'Draws',
      [Language.th]: 'เสมอ',
    },
    losses: {
      [Language.ru]: 'Поражения',
      [Language.en]: 'Losses',
      [Language.th]: 'แพ้',
    },
    tech_losses: {
      [Language.ru]: 'Технические поражения',
      [Language.en]: 'Tech losses',
      [Language.th]: 'แพ้ทางเทคนิค',
    },
    tech_losses_team: {
      [Language.ru]: 'Техническое поражение команде',
      [Language.en]: 'Technical defeat to team',
      [Language.th]: 'ทีมแพ้ทางเทคนิค',
    },
    time_not_set: {
      [Language.en]: 'Time not set',
      [Language.ru]: 'Время не задано',
      [Language.th]: 'ยังไม่ตั้งเวลา',
    },
    td: {
      [Language.en]: 'TD',
      [Language.ru]: 'ТП',
      [Language.th]: 'ทีดี',
    },
    not_started: {
      [Language.en]: 'Not started',
      [Language.ru]: 'Игра не стартовала',
      [Language.th]: 'ยังไม่เริ่ม',
    },
    in_progress: {
      [Language.en]: 'Game in progress',
      [Language.ru]: 'Игра идёт',
      [Language.th]: 'เกมส์เริ่มแล้ว',
    },
    ended: {
      [Language.en]: 'Game ended',
      [Language.ru]: 'Игра завершена',
      [Language.th]: 'เกมส์จบแล้ว',
    },
    photo_by: {
      [Language.en]: 'Photo by',
      [Language.ru]: 'Фотограф',
      [Language.th]: 'ถ่ายโดย',
    },
    with_goals_or_assists: {
      [Language.en]: 'With goals or assists',
      [Language.ru]: 'С голами или передачами',
      [Language.th]: 'ด้วยประตูหรือแอสซิสต์',
    },
    with_goals: {
      [Language.en]: 'With goals',
      [Language.ru]: 'С голами',
      [Language.th]: 'ด้วยประตู',
    },
    with_assists: {
      [Language.en]: 'With assists',
      [Language.ru]: 'С передачами',
      [Language.th]: 'ด้วยแอสซิสต์',
    },
    with_cards: {
      [Language.en]: 'With cards',
      [Language.ru]: 'С карточками',
      [Language.th]: 'ด้วยการ์ด',
    },
    season_has_no_games: {
      [Language.en]: 'Season has no games yet',
      [Language.ru]: 'В сезоне пока нет добавленных игр',
      [Language.th]: 'ฤดูกาลนี้ยังไม่มีเกมส์',
    },
    stats_preview: {
      [Language.en]: 'Stats preview',
      [Language.ru]: 'Статистическое превью',
      [Language.th]: 'เริ่มดูตัวอย่าง',
    },
    duels_history: {
      [Language.en]: 'Duels history',
      [Language.ru]: 'История встреч',
      [Language.th]: 'ประวัติการเจอกัน',
    },
    events: {
      events: {
        [Language.en]: 'Events',
        [Language.ru]: 'Лента событий',
        [Language.th]: 'อีเว๊นท์',
      },
      all_events: {
        [Language.en]: 'All events',
        [Language.ru]: 'Все события',
        [Language.th]: 'อีเว๊นท์ทั้งหมด',
      },
      only_main_events: {
        [Language.en]: 'Only main events',
        [Language.ru]: 'Только основные события',
        [Language.th]: 'อีเว๊นท์หลักเท่านั้น',
      },
      started_first_half: {
        [Language.ru]: 'Первый тайм начинается',
        [Language.en]: 'First half started',
        [Language.th]: 'เริ่มครึ่งแรก',
      },
      events_not_added: {
        [Language.ru]: 'События игры не добавлены',
        [Language.en]: "Game events aren't added yet",
        [Language.th]: 'ยังไม่ได้เพิ่มอีเว๊นท์ของเกม',
      },
      point: {
        [Language.en]: 'Point',
        [Language.ru]: 'Очко',
        [Language.th]: 'แต้ม',
      },
      ace: {
        [Language.en]: 'Ace',
        [Language.ru]: 'Эйс',
        [Language.th]: 'ที่สุด!',
      },
      block: {
        [Language.en]: 'Block',
        [Language.ru]: 'Блок',
        [Language.th]: 'บล็อค',
      },
      steal: {
        [Language.en]: 'Steal',
        [Language.ru]: 'Перехват',
        [Language.th]: 'ขโมย',
      },
      loss: {
        [Language.en]: 'Loss',
        [Language.ru]: 'Потеря',
        [Language.th]: 'แพ้',
      },
      foul: {
        [Language.en]: 'Foul',
        [Language.ru]: 'Нарушение',
        [Language.th]: 'ฟาล์ว',
      },
      goal: {
        [Language.en]: 'Goal',
        [Language.ru]: 'Гол',
        [Language.th]: 'เข้าประตู',
      },
      score_a_free_kick: {
        [Language.ru]: 'забивает со штрафного',
        [Language.en]: 'scored from free kick',
        [Language.th]: 'ประตูจากการยิงฟรีคิก',
      },
      score_a_goal: {
        [Language.ru]: 'забивает гол',
        [Language.en]: 'scores',
        [Language.th]: 'ประตูจากการยิง',
      },
      score_a_penalty: {
        [Language.ru]: 'забивает пенальти',
        [Language.en]: 'scored from penalty',
        [Language.th]: 'ประตูจากจุดโทษ',
      },
      result_score: {
        [Language.ru]: 'Итоговый счёт',
        [Language.en]: 'Final score',
        [Language.th]: 'ผลรวม',
      },
      corner: {
        [Language.en]: 'Corner kick',
        [Language.ru]: 'Угловой',
        [Language.th]: 'เตะมุม',
      },
      danger: {
        [Language.en]: 'Attempt',
        [Language.ru]: 'Опасный момент',
        [Language.th]: 'อันตราย',
      },
      replaces: {
        [Language.ru]: 'заменяет',
        [Language.en]: 'replaces',
        [Language.th]: 'แทนที่',
      },
      replace: {
        [Language.ru]: 'Замена',
        [Language.en]: 'Substitution',
        [Language.th]: 'แทนที่',
      },
      shot: {
        [Language.en]: 'Shot on target',
        [Language.ru]: 'Удар по воротам',
        [Language.th]: 'ยิง',
      },
      shot_missed: {
        [Language.en]: 'Shot missed',
        [Language.ru]: 'Промах',
        [Language.th]: 'ยิงพลาด',
      },
      game_started: {
        [Language.en]: 'Game started',
        [Language.ru]: 'Игра началась',
        [Language.th]: 'เกมส์เริ่มแล้ว',
      },
      game_ended: {
        [Language.en]: 'Game ended',
        [Language.ru]: 'Игра за вершена',
        [Language.th]: 'เกมส์จบแล้ว',
      },
      first_half_ended: {
        [Language.en]: 'First half ended',
        [Language.ru]: 'Первый тайм закончен',
        [Language.th]: 'จบครึ่งแรก',
      },
      period_ended: {
        [Language.en]: 'Period ended',
        [Language.ru]: 'Период завершён',
        [Language.th]: 'หมดเวลา',
      },
      quarter_ended: {
        [Language.en]: 'Quarter ended',
        [Language.ru]: 'Четверть завершена',
        [Language.th]: 'จบไตรมาส',
      },
      set_ended: {
        [Language.en]: 'Set ended',
        [Language.ru]: 'Сет завершён',
        [Language.th]: 'จบชุด',
      },
      unknown: {
        [Language.en]: 'Unknown',
        [Language.ru]: 'Неизвестный',
        [Language.th]: 'ไม่รู้จัก',
      },
      unknown_player: {
        [Language.ru]: 'Неизвестный игрок',
        [Language.en]: 'Unknown player',
        [Language.th]: 'ผู้เล่นที่ไม่รู้จัก',
      },
      own_goal: {
        [Language.en]: 'Own goal',
        [Language.ru]: 'Автогол',
        [Language.th]: 'เข้าประตูตัวเอง',
      },
      from_free_kick: {
        [Language.en]: 'From free kick',
        [Language.ru]: 'Со штрафного',
        [Language.th]: 'จากฟรีคิก',
      },
      from_penalty: {
        [Language.en]: 'From penalty',
        [Language.ru]: 'С пенальти',
        [Language.th]: 'จากจุดโทษ',
      },
      receive_yellow_card: {
        [Language.ru]: 'получает желтую карточку',
        [Language.en]: 'gets a yellow card',
        [Language.th]: 'รับใบเหลือง',
      },
      receive_second_yellow_card: {
        [Language.ru]: 'получает вторую желтую карточку',
        [Language.en]: 'gets a second yellow card',
        [Language.th]: 'รับใบเหลืองใบที่สอง',
      },
      receive_red_card: {
        [Language.ru]: 'получает красную карточку',
        [Language.en]: 'gets a red card',
        [Language.th]: 'รับใบแดง',
      },
    },
    lineup: {
      formation: {
        [Language.en]: 'Formation',
        [Language.ru]: 'Расстановка',
        [Language.th]: '',
      },
      shirt_color: {
        [Language.en]: 'Shirt color',
        [Language.ru]: 'Цвет формы',
        [Language.th]: '',
      },
      lineups: {
        [Language.en]: 'Lineups',
        [Language.ru]: 'Составы',
        [Language.th]: 'จัดทีม',
      },
      optimality: {
        [Language.en]: 'Lineup optimality',
        [Language.ru]: 'Оптимальность состава',
        [Language.th]: 'จัดทีมตามความเหมาะสมของนักเตะ',
      },
      lineup_not_set: {
        [Language.en]: 'Lineup not set',
        [Language.ru]: 'Состав не отмечен',
        [Language.th]: 'ยังไม่ได้จัดทีม',
      },
      set_lineup: {
        [Language.en]: 'Set lineup',
        [Language.ru]: 'Отметить состав',
        [Language.th]: 'จัดทีม',
      },
      nothing_roster: {
        [Language.ru]: 'Состав ещё не добавлен',
        [Language.en]: 'Team has no players yet',
        [Language.th]: '',
      },
      lineup_all_time: {
        [Language.ru]: 'За все время',
        [Language.en]: 'All time players',
        [Language.th]: '',
      },
      lineup_only_current_players: {
        [Language.ru]: 'Только действующие игроки',
        [Language.en]: 'Only current team players',
        [Language.th]: '',
      },
      select_position: {
        [Language.en]: 'Select position',
        [Language.ru]: 'Выберите позицию',
        [Language.th]: '',
      },
      starting_lineup: {
        [Language.en]: 'In start',
        [Language.ru]: 'Стартовый состав',
        [Language.th]: '',
      },
      reserve_lineup: {
        [Language.en]: 'Substitute',
        [Language.ru]: 'Запасной состав',
        [Language.th]: '',
      },
      add_to_lineup: {
        [Language.en]: 'Add to lineup',
        [Language.ru]: 'Добавить в состав',
        [Language.th]: '',
      },
      remove_from_lineup: {
        [Language.en]: 'Remove from lineup',
        [Language.ru]: 'Удалить из состава',
        [Language.th]: '',
      },
      not_registered_for_game: {
        [Language.en]: 'Not in lineup',
        [Language.ru]: 'Не заявлены на игру',
        [Language.th]: '',
      },
    },
    preview: {
      stats_preview: {
        [Language.en]: 'Preview',
        [Language.ru]: 'Превью',
        [Language.th]: 'ตัวอย่าง',
      },
      season_stats: {
        [Language.en]: 'Season stats',
        [Language.ru]: 'По сезону',
        [Language.th]: 'ฟดูกาลเริ่มแล้ว',
      },
      overall_stats: {
        [Language.en]: 'Overall stats',
        [Language.ru]: 'Общая статистика',
        [Language.th]: 'สถิติทั้งหมด',
      },
      last_5_games: {
        [Language.en]: 'Last 5 games',
        [Language.ru]: 'Последние 5 игр',
        [Language.th]: '5 เกมส์ล่าสุด',
      },
      duels: {
        [Language.en]: 'Duels',
        [Language.ru]: 'Очные встречи',
        [Language.th]: 'แข่ง!',
      },
      duels_nothing: {
        [Language.ru]: 'Команды ещё ни разу не встречались друг с другом',
        [Language.en]: 'Teams have never met',
        [Language.th]: 'ไม่มีผู้แข่ง',
      },
      wdl: {
        [Language.en]: 'W-D-L',
        [Language.ru]: 'В-Н-П',
        [Language.th]: 'ช-ส-พ',
      },
      goals: {
        [Language.en]: 'Goals',
        [Language.ru]: 'Голы',
        [Language.th]: 'ประตู',
      },
      all_goals: {
        [Language.ru]: 'Всего голов',
        [Language.en]: 'Total goals',
        [Language.th]: 'ประตูทั้งหมด',
      },
      goals_on_game: {
        [Language.ru]: 'Голов за игру',
        [Language.en]: 'Goals per game',
        [Language.th]: 'ประตูแต่ละเกมส์',
      },
      all_missed: {
        [Language.ru]: 'Всего пропущено',
        [Language.en]: 'Goals conceded',
        [Language.th]: 'ประตูที่ยอมรับ',
      },
      missed_on_game: {
        [Language.ru]: 'Пропущено за игру',
        [Language.en]: 'Conceded per game',
        [Language.th]: 'ยอมรับต่อเกม',
      },
      assists: {
        [Language.en]: 'Assists',
        [Language.ru]: 'Передачи',
        [Language.th]: 'แอสซิสต์',
      },
      goals_assists: {
        [Language.en]: 'Goals + Assists',
        [Language.ru]: 'Голы + Передачи',
        [Language.th]: 'ประตู + แอสซิสต์',
      },
      yellowCards: {
        [Language.en]: 'Yellow cards',
        [Language.ru]: 'Жёлтые карточки',
        [Language.th]: 'ใบเหลือง',
      },
      yellowCard: {
        [Language.ru]: 'Желтая карточка',
        [Language.en]: 'Yellow card',
        [Language.th]: 'ใบเหลือง',
      },
      second_yellowCard: {
        [Language.ru]: 'Вторая желтая карточка',
        [Language.en]: 'Second yellow card',
        [Language.th]: 'ใบเหลืองใบที่สอง',
      },
      redCards: {
        [Language.en]: 'Red cards',
        [Language.ru]: 'Красные карточки',
        [Language.th]: 'ใบแดง',
      },
      redCard: {
        [Language.ru]: 'Красная карточка',
        [Language.en]: 'Red card',
        [Language.th]: 'ใบแดง',
      },
      points: {
        [Language.en]: 'Points',
        [Language.ru]: 'Очки',
        [Language.th]: 'แต้ม',
      },
      all_points_in_game: {
        [Language.ru]: 'Очков за игру',
        [Language.en]: 'Points per game',
        [Language.th]: 'แต้มต่อเกมส์',
      },
      fouls: {
        [Language.en]: 'Fouls',
        [Language.ru]: 'Фолы',
        [Language.th]: 'ฟาล์ว',
      },
      allFouls: {
        [Language.en]: 'Fouls',
        [Language.ru]: 'Фолы',
        [Language.th]: 'ฟาล์ว',
      },
      technicalFouls: {
        [Language.en]: 'Technical fouls',
        [Language.ru]: 'Технические фолы',
        [Language.th]: 'ฟาล์วทางเทคนิค',
      },
      losses: {
        [Language.en]: 'Losses',
        [Language.ru]: 'Потери',
        [Language.th]: 'แพ้',
      },
      steals: {
        [Language.en]: 'Steals',
        [Language.ru]: 'Перехваты',
        [Language.th]: 'ขโมย',
      },
      rebounds: {
        [Language.en]: 'Rebounds',
        [Language.ru]: 'Подборы',
        [Language.th]: 'ย้อนกลับ',
      },
      reboundsA: {
        [Language.en]: 'Attacking rebound',
        [Language.ru]: 'Подбор в нападении',
        [Language.th]: 'จู่โจมกลับ',
      },
      reboundsD: {
        [Language.en]: 'Defencive rebound',
        [Language.ru]: 'Подбор в защите',
        [Language.th]: 'ตั้งรับกลับ',
      },
      misses: {
        [Language.en]: 'Misses',
        [Language.ru]: 'Промахи',
        [Language.th]: 'พลาด',
      },
      blocks: {
        [Language.en]: 'Blocked shots',
        [Language.ru]: 'Блок-шоты',
        [Language.th]: 'ป้องกันการยิงประตู',
      },
      aces: {
        [Language.en]: 'Aces',
        [Language.ru]: 'Эйсы',
        [Language.th]: 'สุดยอด!',
      },
      win_percent: {
        [Language.en]: 'Win percent',
        [Language.ru]: 'Процент побед',
        [Language.th]: 'เปอร์เซ็นการชนะ',
      },
      win_percent_short: {
        [Language.ru]: '% Побед',
        [Language.en]: 'Win %',
        [Language.th]: '% ชนะ',
      },
      yellow_card_short: {
        [Language.ru]: 'ЖК',
        [Language.en]: 'YC',
        [Language.th]: 'ใบเหลือง',
      },
      red_card_short: {
        [Language.ru]: 'КК',
        [Language.en]: 'RC',
        [Language.th]: 'ใบแดง',
      },
      played: {
        [Language.en]: 'Played',
        [Language.ru]: 'Игры',
        [Language.th]: 'เล่น',
      },
      rating: {
        [Language.en]: 'Rating',
        [Language.ru]: 'Рейтинг',
        [Language.th]: 'อันดับ',
      },
      best_players: {
        [Language.en]: 'Best players',
        [Language.ru]: 'Лучшие игроки',
        [Language.th]: 'ผู้เล่นที่ดีที่สุด',
      },
      players_stats: {
        [Language.en]: 'Players stats',
        [Language.ru]: 'Статистика игроков',
        [Language.th]: 'สถิติผู้เล่น',
      },
      nothing_players_stats: {
        [Language.ru]: 'Статистика игроков пуста',
        [Language.en]: 'Player stats is empty',
      },
      no_stats_yet: {
        [Language.en]: 'No stats yet',
        [Language.ru]: 'Пока нет статистики',
        [Language.th]: 'ยังไม่มีสถิติ',
      },
      biggest_win: {
        [Language.ru]: 'Крупнейшая победа',
        [Language.en]: 'Biggest win',
        [Language.th]: 'ชนะมากที่สุด',
      },
      biggest_score: {
        [Language.ru]: 'Крупнейший счёт',
        [Language.en]: 'Biggest score',
        [Language.th]: '',
      },
      biggest_lose: {
        [Language.ru]: 'Крупнейшее поражение',
        [Language.en]: 'Biggest loss',
        [Language.th]: 'แพ้มากที่สุด',
      },
      roughest_game: {
        [Language.ru]: 'Самая грубая игра',
        [Language.en]: 'Roughest game',
        [Language.th]: '',
      },
      best_match: {
        [Language.ru]: 'Лучший матч',
        [Language.en]: 'Best game',
        [Language.th]: 'เกมส์ที่ดีที่สุด',
      },
      most_games: {
        [Language.ru]: 'Больше всего игр',
        [Language.en]: 'Most games',
        [Language.th]: 'เกมส์ส่วนมาก',
      },
      best_results: {
        [Language.ru]: 'Лучшие результаты',
        [Language.en]: 'Best results',
        [Language.th]: 'ผลลัพธ์ที่ดีที่สุด',
      },
      worst_games: {
        [Language.ru]: 'Худшие результаты',
        [Language.en]: 'Worst results',
        [Language.th]: 'ผลลัพธ์ที่แย่ที่สุด',
      },
    },
    wishes: {
      wishes: {
        [Language.ru]: 'Пожелания',
        [Language.en]: 'Wishes',
        [Language.th]: 'ความปรารถนา',
      },
      send_wishes: {
        [Language.en]: 'Send wishes',
        [Language.ru]: 'Отправить пожелания',
        [Language.th]: 'ส่งความปรารถนา',
      },
      select_preferred_slots: {
        [Language.en]: 'Select preferred slots',
        [Language.ru]: 'Отметьте желаемые отрезки',
        [Language.th]: 'เลือกช่องที่ต้องการ',
      },
    },
  },
  media: {
    photos: {
      [Language.en]: 'Photos',
      [Language.ru]: 'Фото',
      [Language.th]: 'รูปภาพ',
    },
    photos_many: {
      [Language.en]: new Plural(Language.en, 'photo', 'photos'),
      [Language.ru]: new Plural(Language.ru, 'фотография', 'фотографии', 'фотографий'),
      [Language.th]: new Plural(Language.th, '', '', ''),
    },
    videos: {
      [Language.en]: 'Videos',
      [Language.ru]: 'Видео',
      [Language.th]: 'วิดิโอ',
    },
    media: {
      [Language.en]: 'Media',
      [Language.ru]: 'Медиа',
      [Language.th]: 'สื่อ',
    },
    media_not_added: {
      [Language.en]: "Media wasn't added yet",
      [Language.ru]: 'Фото и видео еще не добавлены',
      [Language.th]: '',
    },
    news: {
      [Language.en]: 'News',
      [Language.ru]: 'Новости',
      [Language.th]: 'ข่าวสาร',
    },
    newsfeed: {
      [Language.en]: 'Newsfeed',
      [Language.ru]: 'Лента новостей',
      [Language.th]: 'ข่าวล่าสุด',
    },
    no_news_found_by_tag: {
      [Language.en]: 'No news found by selected tag',
      [Language.ru]: 'По выбранному тегу пока нет новостей',
      [Language.th]: 'ไม่พบข่าวที่ต้องการ',
    },
    search_by_post_title: {
      [Language.en]: 'Search by post title',
      [Language.ru]: 'Поиск по заголовку',
      [Language.th]: 'ค้นหาจากหัวข้อ',
    },
    latest_media: {
      [Language.en]: 'Latest media',
      [Language.ru]: 'Свежие медиа',
      [Language.th]: 'สื่อล่าสุด',
    },
    no_photos: {
      [Language.en]: 'No photo was uploaded yet',
      [Language.ru]: 'Пока не загружено ни одной фотографии',
      [Language.th]: 'ยังไม่มีรูปภาพอัพโหลด',
    },
    no_videos: {
      [Language.en]: 'No video was uploaded yet',
      [Language.ru]: 'Пока не загружено ни одного видео',
      [Language.th]: 'ยังไม่มีสิดิโออัพโหลด',
    },
    recommendations: {
      [Language.ru]: 'Рекомендации',
      [Language.en]: 'Recommended',
      [Language.th]: 'แนะนำ',
    },
  },
  navigation: {
    yes: {
      [Language.ru]: 'Да',
      [Language.en]: 'Yes',
      [Language.th]: 'ใช่',
    },
    no: {
      [Language.ru]: 'Нет',
      [Language.ru]: 'No',
      [Language.th]: 'ไม่',
    },
    back: {
      [Language.en]: 'Back',
      [Language.ru]: 'Назад',
      [Language.th]: 'ย้อนกลับ',
    },
    prev: {
      [Language.en]: 'Prev',
      [Language.ru]: 'Назад',
      [Language.th]: 'ก่อนหน้า',
    },
    next: {
      [Language.en]: 'Next',
      [Language.ru]: 'Дальше',
      [Language.th]: 'ต่อไป',
    },
    done: {
      [Language.en]: 'Done',
      [Language.ru]: 'Готово',
      [Language.th]: 'เสร็จ',
    },
    append: {
      [Language.en]: 'append',
      [Language.ru]: 'применить',
    },
    cancel: {
      [Language.en]: 'Cancel',
      [Language.ru]: 'Отмена',
      [Language.th]: 'ยกเลิก',
    },
    edit: {
      [Language.en]: 'Edit',
      [Language.ru]: 'Изменить',
      [Language.th]: 'แก้ไข',
    },
    redact: {
      [Language.ru]: 'Редактировать',
      [Language.en]: 'Edit',
      [Language.th]: 'แก้ไข',
    },
    server_error: {
      [Language.en]: 'Server Error',
      [Language.ru]: 'Ошибка сервера',
      [Language.th]: 'เซิฟเวอร์มีปัญหา',
    },
    more: {
      [Language.en]: 'plus',
      [Language.ru]: 'ещё',
      [Language.th]: 'เพิ่มเติม',
    },
    add: {
      [Language.ru]: 'Добавить',
      [Language.en]: 'Add',
      [Language.th]: 'เพิ่ม',
    },
    skip: {
      [Language.ru]: 'Пропустить авторизацию',
      [Language.en]: 'Skip auth',
      [Language.th]: 'ถัดไป',
    },
    continue: {
      [Language.ru]: 'Продолжить',
      [Language.en]: 'Continue',
      [Language.th]: 'ไปต่อ',
    },
    more_detailed: {
      [Language.ru]: 'Подробнее',
      [Language.en]: 'Details',
      [Language.th]: 'รายละเอียด',
    },
    confirm: {
      [Language.ru]: 'Подтвердить',
      [Language.en]: 'Confirm',
      [Language.th]: 'ยืนยัน',
    },
  },
  stadium: {
    stadium: {
      [Language.en]: 'Stadium',
      [Language.ru]: 'Стадион',
      [Language.th]: 'สนาม',
    },
    stadiums: {
      [Language.en]: 'Stadiums',
      [Language.ru]: 'Стадионы',
      [Language.th]: 'สนาม',
    },
    search_by_stadium_name: {
      [Language.en]: 'Search by stadium name',
      [Language.ru]: 'Поиск по названию стадиона',
      [Language.th]: 'ค้นหาจากชื่อสนาม',
    },
    all_stadiums: {
      [Language.en]: 'All stadiums',
      [Language.ru]: 'Все стадионы',
      [Language.th]: 'สนามทั้งหมด',
    },
    overview: {
      [Language.en]: 'Overview',
      [Language.ru]: 'Информация',
      [Language.th]: 'ภาพรวม',
    },
    address: {
      [Language.en]: 'Address',
      [Language.ru]: 'Адрес',
      [Language.th]: 'ที่อยู่',
    },
    see_stadium_location_on_map: {
      [Language.en]: 'See stadium location on the map',
      [Language.ru]: 'Посмотреть расположение стадиона на карте',
      [Language.th]: 'ดูแผนที่สนาม',
    },
    on_map: {
      [Language.en]: 'Map',
      [Language.ru]: 'На карте',
      [Language.th]: 'แผนที่',
    },
    pitch: {
      [Language.en]: 'Pitch',
      [Language.ru]: 'Поле',
      [Language.th]: 'สนาม',
    },
    location: {
      [Language.ru]: 'Расположение',
      [Language.en]: 'Location',
      [Language.th]: 'ตำแหน่ง',
    },
    capacity: {
      [Language.ru]: 'Вместимость',
      [Language.en]: 'Capacity',
      [Language.th]: 'ความจุ',
    },
    pitch_size: {
      [Language.en]: 'Pitch size',
      [Language.ru]: 'Размер поля',
      [Language.th]: 'ขนาดสนาม',
    },
    how_to_get: {
      [Language.en]: 'How to get to',
      [Language.ru]: 'Как добраться',
      [Language.th]: 'วิธีการเดินทาง',
    },
    pitches: {
      [Language.en]: 'Pitches',
      [Language.ru]: 'Поля',
      [Language.th]: 'สนาม',
    },
    all_pitches: {
      [Language.en]: 'All pitches',
      [Language.ru]: 'Все поля',
      [Language.th]: 'สนามทั้งหมด',
    },
    surface: {
      [Language.en]: 'Surface',
      [Language.ru]: 'Покрытие',
      [Language.th]: 'พื้นสนาม',
    },
    recommended_shoes: {
      [Language.en]: 'Recommended shoes',
      [Language.ru]: 'Рекомендуемая обувь',
      [Language.th]: 'รองเท้าแนะนำ',
    },
    search_by_pitch_name: {
      [Language.en]: 'Search by pitch name',
      [Language.ru]: 'Поиск по названию поля',
      [Language.th]: 'ค้นหาจากชื่อสนาม',
    },
  },
  player: {
    search_by_player_name: {
      [Language.en]: "Search by player's name",
      [Language.ru]: 'Поиск по имени игрока',
      [Language.th]: 'ค้นหาจากชื่อผู้เล่น',
    },
    players: {
      [Language.en]: 'Players',
      [Language.ru]: 'Игроки',
      [Language.th]: 'ผู้เล่น',
    },
    all_players: {
      [Language.en]: 'All players',
      [Language.ru]: 'Все игроки',
      [Language.th]: 'ผู้เล่นทั้งหมด',
    },
    total_players: {
      [Language.en]: 'total',
      [Language.ru]: 'всего',
      [Language.th]: '',
    },
    name: {
      [Language.en]: 'Player name',
      [Language.ru]: 'Имя игрока',
      [Language.th]: 'ชื่อผู้เล่น',
    },
    last_name: {
      [Language.ru]: 'Фамилия',
      [Language.en]: 'Last name',
      [Language.th]: 'นามสกุล',
    },
    first_name: {
      [Language.ru]: 'Имя',
      [Language.en]: 'First name',
      [Language.th]: 'ชื่อจริง',
    },
    middle_name: {
      [Language.ru]: 'Отчество',
      [Language.en]: 'Middle name',
      [Language.th]: 'ชื่อกลาง',
    },
    citizenship: {
      [Language.ru]: 'Гражданство',
      [Language.en]: 'Citizenship',
      [Language.th]: 'สัญชาติ',
    },
    career: {
      [Language.en]: 'Career',
      [Language.ru]: 'Карьера',
      [Language.th]: 'อาชีพ/ตำแหน่ง',
    },
    free_agent: {
      [Language.en]: 'Free agent',
      [Language.ru]: 'Свободный агент',
      [Language.th]: 'ฟรีตัวแทน',
    },
    birthday: {
      [Language.en]: 'Birth Date',
      [Language.ru]: 'Дата рождения',
      [Language.th]: 'วันเกิด',
    },
    age: {
      [Language.en]: 'Age',
      [Language.ru]: 'Возраст',
      [Language.th]: 'อายุ',
    },
    profiles_in_leagues: {
      [Language.ru]: 'Профили игрока в лигах',
      [Language.en]: 'Player profiles in leagues',
      [Language.th]: 'โปรไฟล์ผู้เล่นในลีค',
    },
    new_player: {
      [Language.ru]: 'Новый игрок',
      [Language.en]: 'New player',
      [Language.th]: 'ผู้เล่นใหม่',
    },
    edit_player: {
      [Language.ru]: 'Редактировать профиль',
      [Language.en]: 'Edit profile',
      [Language.th]: 'แก้ไขโปรไฟล์',
    },
    y_o: {
      [Language.en]: new Plural(Language.en, 'y.o'),
      [Language.ru]: new Plural(Language.ru, 'год', 'года', 'лет'),
      [Language.th]: new Plural(Language.th, 'ปี'),
    },
    cm: {
      [Language.en]: 'cm',
      [Language.ru]: 'см',
      [Language.th]: 'ซม.',
    },
    kg: {
      [Language.en]: 'kg',
      [Language.ru]: 'кг',
      [Language.th]: 'กก.',
    },
    height: {
      [Language.en]: 'Height',
      [Language.ru]: 'Рост',
      [Language.th]: 'ส่วนสูง',
    },
    weight: {
      [Language.en]: 'Weight',
      [Language.ru]: 'Вес',
      [Language.th]: 'น้ำหนัก',
    },
    right_handed: {
      [Language.en]: 'Right handed',
      [Language.ru]: 'Правша',
      [Language.th]: 'มือขวา',
    },
    left_handed: {
      [Language.en]: 'Left handed',
      [Language.ru]: 'Левша',
      [Language.th]: 'มือซ้าย',
    },
    right_footed: {
      [Language.en]: 'Right footed',
      [Language.ru]: 'Правша',
      [Language.th]: 'เท้าขวา',
    },
    left_footed: {
      [Language.en]: 'Left footed',
      [Language.ru]: 'Левша',
      [Language.th]: 'เท้าซ้าย',
    },
    foot: {
      [Language.ru]: 'Нога',
      [Language.en]: 'Leg',
      [Language.th]: 'ขา',
    },
    position: {
      [Language.en]: 'Position',
      [Language.ru]: 'Позиция',
      [Language.th]: 'ตำแหน่ง',
    },
    number: {
      [Language.en]: 'Number',
      [Language.ru]: 'Номер',
      [Language.th]: 'หมายเลข',
    },
    also_playing_in: {
      [Language.en]: 'Also playing in',
      [Language.ru]: 'Также играет в',
      [Language.th]: 'และยังเล่นใน',
    },
    nationality: {
      [Language.ru]: 'Гражданство',
      [Language.en]: 'Citizenship',
      [Language.th]: 'สัญชาติ',
    },
    professional: {
      [Language.ru]: 'Профессионал',
      [Language.ru]: 'Professional',
      [Language.th]: 'มืออาชีพ',
    },
    eias: {
      [Language.ru]: 'Номер в РФС ЕИАС',
      [Language.en]: 'RFS Eias Number',
      [Language.th]: 'หมายเลข RFS Eias',
    },
    stats: {
      all_stats: {
        [Language.ru]: 'Вся статистика',
        [Language.en]: 'Full stats',
        [Language.th]: 'สถิติทั้งหมด',
      },
      games: {
        [Language.ru]: new Plural(Language.ru, 'игра', 'игры'),
        [Language.en]: new Plural(Language.en, 'game', 'games'),
        [Language.th]: new Plural(Language.th, 'เกมส์', 'เกมส์'),
      },
      goals: {
        [Language.en]: new Plural(Language.en, 'goal', 'goals'),
        [Language.ru]: new Plural(Language.ru, 'гол', 'гола', 'голов'),
        [Language.th]: new Plural(Language.th, 'ประตู', 'ประตู'),
      },
      assists: {
        [Language.en]: new Plural(Language.en, 'assist', 'assists'),
        [Language.ru]: new Plural(Language.ru, 'пас', 'паса', 'пасов'),
        [Language.th]: new Plural(Language.th, 'แอสซิสต์', 'แอสซิสต์'),
      },
      goals_assists: {
        [Language.en]: new Plural(Language.en, 'point', 'points'),
        [Language.ru]: new Plural(Language.ru, 'очко', 'очка', 'очков'),
        [Language.th]: new Plural(Language.th, 'แต้ม', 'แต้ม'),
      },
      yellowCards: {
        [Language.en]: new Plural(Language.en, 'y.c.'),
        [Language.ru]: new Plural(Language.ru, 'ж.к.'),
        [Language.th]: new Plural(Language.th, 'บ.ล.'),
      },
      redCards: {
        [Language.en]: new Plural(Language.en, 'r.c.'),
        [Language.ru]: new Plural(Language.ru, 'к.к.'),
        [Language.th]: new Plural(Language.th, 'บ.ด.'),
      },
      points: {
        [Language.en]: new Plural(Language.en, 'point', 'points'),
        [Language.ru]: new Plural(Language.ru, 'очко', 'очка', 'очков'),
        [Language.th]: new Plural(Language.th, 'แต้ม', 'แต้ม', 'แต้ม'),
      },
      fouls: {
        [Language.en]: new Plural(Language.en, 'foul', 'fouls'),
        [Language.ru]: new Plural(Language.ru, 'фол', 'фола', 'фолов'),
        [Language.th]: new Plural(Language.th, 'ฟาล์ว', 'ฟาล์ว', 'ฟาล์ว'),
      },
      allFouls: {
        [Language.en]: new Plural(Language.en, 'foul', 'fouls'),
        [Language.ru]: new Plural(Language.ru, 'фол', 'фола', 'фолов'),
        [Language.th]: new Plural(Language.th, 'ฟาล์ว', 'ฟาล์ว', 'ฟาล์ว'),
      },
      technicalFouls: {
        [Language.en]: new Plural(Language.en, 'foul', 'fouls'),
        [Language.ru]: new Plural(Language.ru, 'фол', 'фола', 'фолов'),
        [Language.th]: new Plural(Language.th, 'ฟาล์ว', 'ฟาล์ว', 'ฟาล์ว'),
      },
      losses: {
        [Language.en]: new Plural(Language.en, 'loss', 'losses'),
        [Language.ru]: new Plural(Language.ru, 'потеря', 'потери', 'потерь'),
        [Language.th]: new Plural(Language.th, 'แพ้', 'แพ้', 'แพ้'),
      },
      steals: {
        [Language.en]: new Plural(Language.en, 'steal', 'steals'),
        [Language.ru]: new Plural(Language.ru, 'перехват', 'перехвата', 'перехватов'),
        [Language.th]: new Plural(Language.th, 'ขโมย', 'ขโมย', 'ขโมย'),
      },
      rebounds: {
        [Language.en]: new Plural(Language.en, 'rebound', 'rebounds'),
        [Language.ru]: new Plural(Language.ru, 'подбор', 'подбора', 'подборов'),
        [Language.th]: new Plural(Language.th, 'ย้อนกลับ', 'ย้อนกลับ', 'ย้อนกลับ'),
      },
      reboundsA: {
        [Language.en]: new Plural(Language.en, 'rebound', 'rebounds'),
        [Language.ru]: new Plural(Language.ru, 'подбор', 'подбора', 'подборов'),
        [Language.th]: new Plural(Language.th, 'ย้อนกลับ', 'ย้อนกลับ', 'ย้อนกลับ'),
      },
      reboundsD: {
        [Language.en]: new Plural(Language.en, 'rebound', 'rebounds'),
        [Language.ru]: new Plural(Language.ru, 'подбор', 'подбора', 'подборов'),
        [Language.th]: new Plural(Language.th, 'ย้อนกลับ', 'ย้อนกลับ', 'ย้อนกลับ'),
      },
      misses: {
        [Language.en]: new Plural(Language.en, 'miss', 'misses'),
        [Language.ru]: new Plural(Language.ru, 'промах', 'промаха', 'промахов'),
        [Language.th]: new Plural(Language.th, 'พลาด', 'พลาด', 'พลาด'),
      },
      blocks: {
        [Language.en]: new Plural(Language.en, 'block', 'blocks'),
        [Language.ru]: new Plural(Language.ru, 'блок', 'блока', 'блоков'),
        [Language.th]: new Plural(Language.th, 'บล็อค', 'บล็อค', 'บล็อค'),
      },
      aces: {
        [Language.en]: new Plural(Language.en, 'ace', 'aces'),
        [Language.ru]: new Plural(Language.ru, 'эйс', 'эйса', 'эйсов'),
        [Language.th]: new Plural(Language.th, 'สุดยอด!', 'สุดยอด!', 'สุดยอด!'),
      },
    },
  },
  standings: {
    table: {
      [Language.en]: 'Table',
      [Language.ru]: 'Таблица',
      [Language.th]: 'โต๊ะ',
    },
    place: {
      [Language.en]: 'Place',
      [Language.ru]: 'Место',
      [Language.th]: 'สถานที่',
    },
    pos: {
      [Language.en]: 'Pos',
      [Language.ru]: 'Поз',
      [Language.th]: 'พีโอเอส',
    },
    name: {
      [Language.en]: 'Name',
      [Language.ru]: 'Название',
      [Language.th]: 'ชื่อ',
    },
    gms: {
      [Language.en]: 'G',
      [Language.ru]: 'И',
      [Language.th]: 'ก',
    },
    wdl: {
      [Language.en]: 'W-D-L',
      [Language.ru]: 'В-Н-П',
      [Language.th]: 'ช-ส-พ',
    },
    wl: {
      [Language.en]: 'W-L',
      [Language.ru]: 'В-П',
      [Language.th]: 'ช-พ',
    },
    gd: {
      [Language.en]: 'GD',
      [Language.ru]: 'ЗП',
      [Language.th]: 'ต่าง',
    },
    pts: {
      [Language.en]: 'P',
      [Language.ru]: 'О',
      [Language.th]: 'ต',
    },
    win_percent: {
      [Language.en]: 'W%',
      [Language.ru]: 'П%',
      [Language.th]: '%ช',
    },
    form: {
      [Language.en]: 'Form',
      [Language.ru]: 'Форма',
      [Language.th]: 'ฟอร์ม',
    },
  },
  news: {
    news: {
      [Language.en]: 'News',
      [Language.ru]: 'Новости',
      [Language.th]: 'ข่าว',
    },
    tags: {
      [Language.en]: 'Tags',
      [Language.ru]: 'Тэги',
      [Language.th]: 'ป้าย',
    },
    related_posts: {
      [Language.en]: 'Related posts',
      [Language.ru]: 'Похожие новости',
      [Language.th]: 'โพสต์ที่เกี่ยวข้อง',
    },
    share: {
      [Language.ru]: 'Поделиться',
      [Language.en]: 'Share',
    },
  },
  position: {
    all_positions: {
      [Language.en]: 'All positions',
      [Language.ru]: 'Все позиции',
      [Language.th]: 'ตำแหน่งทั้งหทด',
    },
    football: {
      goalkeeper: {
        [Language.en]: 'Goalkeeper',
        [Language.ru]: 'Вратарь',
        [Language.th]: 'ผู้รักษาประตู',
      },
      goalkeepers: {
        [Language.en]: 'Goalkeepers',
        [Language.ru]: 'Вратари',
        [Language.th]: 'ผู้รักษาประตู',
      },
      defender: {
        [Language.en]: 'Defender',
        [Language.ru]: 'Защитник',
        [Language.th]: 'กองหลัง',
      },
      defenders: {
        [Language.en]: 'Defenders',
        [Language.ru]: 'Защитники',
        [Language.th]: 'กองหลัง',
      },
      midfielder: {
        [Language.en]: 'Midfielder',
        [Language.ru]: 'Полузащитник',
        [Language.th]: 'กองกลาง',
      },
      midfielders: {
        [Language.en]: 'Midfielders',
        [Language.ru]: 'Полузащитники',
        [Language.th]: 'กองกลาง',
      },
      versatile: {
        [Language.en]: 'Versatile',
        [Language.ru]: 'Универсал',
        [Language.th]: 'อเนกประสงค์',
      },
      striker: {
        [Language.en]: 'Striker',
        [Language.ru]: 'Нападающий',
        [Language.th]: 'กองหน้า',
      },
      strikers: {
        [Language.en]: 'Strikers',
        [Language.ru]: 'Нападающие',
        [Language.th]: 'กองหน้า',
      },
      GK: {
        [Language.en]: 'Goalkeeper',
        [Language.ru]: 'Вратарь',
        [Language.th]: 'ผู้รักษาประตู',
      },
      CB: {
        [Language.en]: 'Central back',
        [Language.ru]: 'Центральный защитник',
        [Language.th]: 'กองกลาง(เซ็นเตอร์)',
      },
      LB: {
        [Language.en]: 'Left back',
        [Language.ru]: 'Левый защитник',
        [Language.th]: 'กองหลังปีกซ้าย',
      },
      RB: {
        [Language.en]: 'Right back',
        [Language.ru]: 'Правый защитник',
        [Language.th]: 'กองหลังปีกขวา',
      },
      CM: {
        [Language.en]: 'Central midfielder',
        [Language.ru]: 'Центральный полузащитник',
        [Language.th]: 'กองกลาง(เซ็นเตอร์)',
      },
      LM: {
        [Language.en]: 'Left midfielder',
        [Language.ru]: 'Левый полузащитник',
        [Language.th]: 'กองกลางปีกซ้าย',
      },
      RM: {
        [Language.en]: 'Right midfielder',
        [Language.ru]: 'Правый полузащитник',
        [Language.th]: 'กองกลางปีกขวา',
      },
      ST: {
        [Language.en]: 'Striker',
        [Language.ru]: 'Нападающий',
        [Language.th]: 'กองหน้า',
      },
    },
    basketball: {
      center: {
        [Language.en]: 'Center',
        [Language.ru]: 'Центровой',
        [Language.th]: 'เซ็นเตอร์',
      },
      point_guard: {
        [Language.en]: 'Point Guard',
        [Language.ru]: 'Разыгрывающий защитник',
        [Language.th]: 'การ์ดจ่าย',
      },
      shooting_guard: {
        [Language.en]: 'Shooting Guard',
        [Language.ru]: 'Атакующий защитник',
        [Language.th]: 'ชูตติ้งการ์ด',
      },
      power_forward: {
        [Language.en]: 'Power forward',
        [Language.ru]: 'Тяжёлый форвард',
        [Language.th]: 'เพาเวอร์ฟอร์เวิร์ด',
      },
    },
    hockey: {
      goalie: {
        [Language.en]: 'Goalie',
        [Language.ru]: 'Вратарь',
        [Language.th]: 'ผู้รักษาประตู',
      },
      defenceman: {
        [Language.en]: 'Defenceman',
        [Language.ru]: 'Защитник',
        [Language.th]: 'ฝ่ายรับ',
      },
      winger: {
        [Language.en]: 'Winger',
        [Language.ru]: 'Крайний нападающий',
        [Language.th]: 'ปีก',
      },
      centre: {
        [Language.en]: 'Centre',
        [Language.ru]: 'Центральный нападающий',
        [Language.th]: 'กองกลาง',
      },
    },
    volleyball: {
      setter: {
        [Language.en]: 'Setter',
        [Language.ru]: 'Связующий',
        [Language.th]: 'ตัวเซ็ท',
      },
      libero: {
        [Language.en]: 'Libero',
        [Language.ru]: 'Либеро',
        [Language.th]: 'ลิเบโร่',
      },
      middle_blocker: {
        [Language.en]: 'Middle Blocker',
        [Language.ru]: 'Центральный блокирующий',
        [Language.th]: 'ตัวบล็อคกลาง',
      },
      opposite_hitter: {
        [Language.en]: 'Opposite Hitter',
        [Language.ru]: 'Диагональный',
        [Language.th]: 'ตัวตีตรงข้าม',
      },
      outside_hitter: {
        [Language.en]: 'Outside Hitter',
        [Language.ru]: 'Доигровщик',
        [Language.th]: 'ตัวตีด้านนอก',
      },
    },
  },
  global_search: {
    global_search: {
      [Language.en]: 'Search (teams, players, tournaments, games, stadiums)',
      [Language.ru]: 'Поиск (команды, игроки, турниры, игры, стадионы)',
      [Language.th]: 'ค้นหา (ทีม, ผู้เล่น, ทัวร์นาเมนต์, เกมส์, สนาม)',
    },
    global_search_description: {
      [Language.en]: 'Search for teams, players, tournaments or games in all leagues and countries',
      [Language.ru]: 'Ищите игроков, команды, турниры и игры во всех лигах и городах',
      [Language.th]: 'ค้นหาสำหรับทีม, ผู้เล่น, ทัวร์นาเมนต์หรือเกมส์ในทุกลีกและประเทศ',
    },
    global_search_description_short: {
      [Language.ru]: 'Ищите игроков, команды, турниры и стадионы',
      [Language.en]: 'Search for teams, players, tournaments or games',
      [Language.th]: 'ค้นหาสำหรับทีม, ผู้เล่น, ทัวร์นาเมนต์หรือเกมส์',
    },
    all_cities: {
      [Language.en]: 'All cities',
      [Language.ru]: 'Все города',
      [Language.th]: 'เมืองทั้งหมด',
    },
    all_leagues: {
      [Language.en]: 'All leagues',
      [Language.ru]: 'Все лиги',
      [Language.th]: 'ลีกทั้งหมด',
    },
    available_leagues: {
      [Language.en]: 'Available Leagues',
      [Language.ru]: 'Доступные лиги',
      [Language.th]: 'ลีกที่มีอยู่',
    },
    filter: {
      [Language.en]: 'Filter',
      [Language.ru]: 'Фильтр',
      [Language.th]: 'ฟิลร์เตอร์',
    },
    show_results_on_city: {
      [Language.ru]: 'Показаны результаты по ',
      [Language.en]: 'Displayed results for',
    },
    show_results_on_all_cities: {
      [Language.ru]: 'Показать результаты по другим городам',
      [Language.en]: 'Show results for other cities',
    },
  },
  search: {
    search: {
      [Language.en]: 'Search',
      [Language.ru]: 'Поиск',
      [Language.th]: 'ค้นหา',
    },
    nothing_found: {
      [Language.en]: 'Nothing found',
      [Language.ru]: 'Ничего не найдено',
      [Language.th]: 'ไม่พบสิ่งที่ต้องการ',
    },
  },
  team: {
    teams: {
      [Language.en]: 'Teams',
      [Language.ru]: 'Команды',
      [Language.th]: 'ทีม',
    },
    team: {
      [Language.en]: 'Team',
      [Language.ru]: 'Команда',
      [Language.th]: 'ทีม',
    },
    founded: {
      [Language.en]: 'Founded',
      [Language.ru]: 'Основана',
      [Language.th]: 'ก่อตั้ง',
    },
    rating: {
      [Language.en]: 'Rating',
      [Language.ru]: 'Рейтинг',
      [Language.th]: 'อันดับ',
    },
    search_by_team_name: {
      [Language.en]: 'Search by team name',
      [Language.ru]: 'Поиск по названию команды',
      [Language.th]: 'ค้นหาจากชื่อทีม',
    },
    all_teams: {
      [Language.en]: 'All teams',
      [Language.ru]: 'Все команды',
      [Language.th]: 'ทีมทั้งหทด',
    },
    total_teams: {
      [Language.en]: 'Total',
      [Language.ru]: 'Всего',
      [Language.th]: '',
    },
    team_stats: {
      [Language.ru]: 'Статистика команды',
      [Language.en]: 'Team stats',
      [Language.th]: 'สถิติทีม',
    },
    players_for_all_time: {
      [Language.ru]: 'Игроков за всё время',
      [Language.en]: 'All time players',
    },
    add_player: {
      [Language.ru]: 'Добавить игрока',
      [Language.en]: 'Add player',
      [Language.th]: 'เพิ่มผู้เล่น',
    },
    edit_roster: {
      [Language.ru]: 'Редактировать состав',
      [Language.en]: 'Edit roster',
      [Language.th]: 'แก้ไขตาราง',
    },
    count_players: {
      [Language.ru]: 'Количество игроков',
      [Language.en]: 'Number of players',
      [Language.th]: 'นับผู้เล่น',
    },
    year_foundation: {
      [Language.en]: 'Founded',
      [Language.ru]: 'Год основания',
      [Language.th]: '',
    },
    stats: {
      stats: {
        [Language.en]: 'Stats',
        [Language.ru]: 'Статистика',
        [Language.th]: 'สถิติ',
      },
      gms: {
        [Language.en]: 'P',
        [Language.ru]: 'И',
        [Language.th]: 'เกมส์',
      },
      played: {
        [Language.en]: 'P',
        [Language.ru]: 'И',
        [Language.th]: 'ล',
      },
      goals: {
        [Language.en]: 'G',
        [Language.ru]: 'Г',
        [Language.th]: 'ป',
      },
      points: {
        [Language.en]: 'P',
        [Language.ru]: 'О',
        [Language.th]: 'ต',
      },
      assists: {
        [Language.en]: 'A',
        [Language.ru]: 'П',
        [Language.th]: 'A',
      },
      points_per_game: {
        [Language.en]: 'Ppg',
        [Language.ru]: 'О/и',
        [Language.th]: 'ต/ก',
      },
      assists_per_game: {
        [Language.en]: 'Apg',
        [Language.ru]: 'А/и',
        [Language.th]: 'A/ก',
      },
      blocks_per_game: {
        [Language.en]: 'Bpg',
        [Language.ru]: 'Б/и',
        [Language.th]: 'บ/ก',
      },
      rebounds_per_game: {
        [Language.en]: 'Rpg',
        [Language.ru]: 'П/и',
        [Language.th]: 'ร/ก',
      },
    },
    parent_team: {
      [Language.en]: 'Parent team',
      [Language.ru]: 'Основа',
      [Language.th]: 'ทีมหลัก',
    },
    reserve_team: {
      [Language.en]: 'Reserve team',
      [Language.ru]: 'Дубль',
      [Language.th]: 'ทีมสำรอง',
    },
    roster: {
      [Language.en]: 'Roster',
      [Language.ru]: 'Заявка',
      [Language.th]: 'ตาราง',
    },
    from_team: {
      [Language.ru]: 'Из команды',
      [Language.en]: 'From team',
      [Language.th]: 'จากทีม',
    },
    in_team: {
      [Language.ru]: 'В команду',
      [Language.en]: 'To team',
      [Language.th]: 'ไปทีม',
    },
    change_roster: {
      [Language.en]: 'Change roster',
      [Language.ru]: 'Изменить заявку',
      [Language.th]: 'เปลี่ยนตาราง',
    },
    create_new_player: {
      [Language.en]: 'Create new player',
      [Language.ru]: 'Создать нового игрока',
      [Language.th]: 'สร้างผู้เล่นใหม่',
    },
    edit_player_profile: {
      [Language.en]: 'Edit player profile',
      [Language.ru]: 'Изменить профиль игрока',
      [Language.th]: 'แก้ไขโพรไฟล์ผู้เล่น',
    },
    save_changes: {
      [Language.ru]: 'Сохранить изменения',
      [Language.en]: 'Save changes',
      [Language.th]: 'บันทึก',
    },
    request_transfer: {
      [Language.en]: 'Request transfer',
      [Language.ru]: 'Запросить трансфер',
      [Language.th]: 'ส่งคำขอแลกเปลี่ยน',
    },
    request_created: {
      [Language.en]: 'Request created. Transfer will be completed after confirmation by the administrator.',
      [Language.ru]: 'Запрос создан. Транфер будет завершён после подтверждения администратором.',
    },
    request_created_for_add: {
      [Language.ru]: 'Заявка создана. Игрок будет добавлен в состав после подтверждения администратором.',
      [Language.en]: "Request created. Player will be added to roster after admin's approval",
      [Language.th]: '',
    },
    create_player: {
      [Language.en]: 'Create player',
      [Language.ru]: 'Создать игрока',
      [Language.th]: 'สร้างผู้เล่น',
    },
    remove_from_roster: {
      [Language.en]: 'Remove from roster',
      [Language.ru]: 'Удалить из заявки',
      [Language.th]: 'ลบออกจากตาราง',
    },
    team_has_no_players: {
      [Language.en]: 'Team has no players',
      [Language.ru]: 'У команды нет игроков',
      [Language.th]: 'ทีมไม่มีผู้เล่น',
    },
    top_players: {
      [Language.en]: 'Top players',
      [Language.ru]: 'Лучшие игроки',
      [Language.th]: 'ผู้เล่นระดับสูง',
    },
    chemistry: {
      [Language.en]: 'Chemistry',
      [Language.ru]: 'Химия',
      [Language.th]: 'สูตร',
    },
    no_stats_yet: {
      [Language.en]: 'No stats yet',
      [Language.ru]: 'Пока нет статистики',
      [Language.th]: 'ยังไม่มีสถิติ',
    },
    avg_age: {
      [Language.en]: 'Avg. age',
      [Language.ru]: 'Ср. возраст',
      [Language.th]: 'อายุโดยประมาณ',
    },
    avg_age_full: {
      [Language.en]: 'Average age',
      [Language.ru]: 'Средний возраст',
    },
    action: {
      create: {
        [Language.ru]: 'Создать',
        [Language.en]: 'Create',
      },
      transfer: {
        [Language.ru]: 'Трансфер',
        [Language.en]: 'Transfer',
      },
      free_transfer: {
        [Language.ru]: 'Переход свободного агента',
        [Language.en]: 'Free transfer',
      },
      combine: {
        [Language.ru]: 'Совмещение',
        [Language.en]: 'Combination',
      },
      roster_remove: {
        [Language.ru]: 'Удалить из заявки',
        [Language.en]: 'Remove from roster',
      },
    },
    current_request_type: {
      transfer_requests: {
        [Language.ru]: 'Трансферные запросы',
        [Language.en]: 'Transfer requests',
      },
      create: {
        [Language.ru]: 'Заявка на создание',
        [Language.en]: 'Creation request',
      },
      transfer: {
        [Language.ru]: 'Заявка на трансфер',
        [Language.en]: 'Transfer request',
      },
      free_transfer: {
        [Language.ru]: 'Переход свободного агента',
        [Language.en]: 'Free transfer request',
      },
      combine: {
        [Language.ru]: 'Заявка на совмещение',
        [Language.en]: 'Combination request',
      },
    },
    request_state: {
      awaiting_your_approval: {
        [Language.ru]: 'Ожидает вашего подтверждения',
        [Language.en]: 'Waiting for your approval',
      },
      awaiting_captain_approval: {
        [Language.ru]: 'Ожидает подтверждения капитана',
        [Language.en]: "Waiting for captain's approval",
      },
      awaiting_admin_approval: {
        [Language.ru]: 'Ожидает подтверждения администратора',
        [Language.en]: 'Waiting for admin approval',
      },
      approved_by_you: {
        [Language.ru]: 'Подтверждено вами',
        [Language.en]: 'Approved by you',
      },
      declined_by_you: {
        [Language.ru]: 'Отклонено вами',
        [Language.en]: 'Declined by you',
      },
      approved_by_captain: {
        [Language.ru]: 'Подтверждено капитаном',
        [Language.en]: 'Approved by captain',
      },
      approve: {
        [Language.ru]: 'Подтвердить',
        [Language.en]: 'Approve',
      },
      decline: {
        [Language.ru]: 'Отклонить',
        [Language.en]: 'Decline',
      },
      active_requests: {
        [Language.ru]: 'Активные запросы',
        [Language.en]: 'Active requests',
      },
    },
    participate_in_life_team: {
      [Language.ru]: 'Участвуйте в жизни команды в Telegram с помощью сервиса',
      [Language.en]: 'Participate in team life in Telegram with',
    },
    go_to_bot: {
      [Language.ru]: 'Перейти в бот',
      [Language.en]: 'Go to bot',
    },
    team_dont_played_games: {
      [Language.ru]: 'Команда ещё не сыграла ни одного матча',
      [Language.en]: 'Team has not played any games yet',
    },
  },
  sports: {
    all_sports: {
      [Language.en]: 'All sports',
      [Language.ru]: 'Все виды спорта',
      [Language.th]: 'กีฬาทั้งหมด',
    },
    football: {
      [Language.en]: 'Football',
      [Language.ru]: 'Футбол',
      [Language.th]: 'ฟุตบอล',
    },
    beach_soccer: {
      [Language.en]: 'Beach soccer',
      [Language.ru]: 'Пляжный футбол',
      [Language.th]: 'ฟุตบอลชายหาด',
    },
    volleyball: {
      [Language.en]: 'Volleyball',
      [Language.ru]: 'Волейбол',
      [Language.th]: 'วอลเลย์บอล',
    },
    basketball: {
      [Language.en]: 'Basketball',
      [Language.ru]: 'Баскетбол',
      [Language.th]: 'บาสเกตบอล',
    },
    water_polo: {
      [Language.en]: 'Water polo',
      [Language.ru]: 'Водное поло',
      [Language.th]: 'โปโลน้ำ',
    },
    hockey: {
      [Language.en]: 'Hockey',
      [Language.ru]: 'Хоккей',
      [Language.th]: 'ฮ็อกกี้',
    },
    subtypes: {
      'football 5x5': {
        [Language.en]: 'football 5x5',
        [Language.ru]: 'футбол 5x5',
        [Language.th]: '',
      },
      'football 6x6': {
        [Language.en]: 'football 6x6',
        [Language.ru]: 'футбол 6x6',
        [Language.th]: '',
      },
      'football 7x7': {
        [Language.en]: 'football 7x7',
        [Language.ru]: 'футбол 7x7',
        [Language.th]: '',
      },
      'football 8x8': {
        [Language.en]: 'football 8x8',
        [Language.ru]: 'футбол 8x8',
        [Language.th]: '',
      },
      'football 11x11': {
        [Language.en]: 'football 11x11',
        [Language.ru]: 'футбол 11x11',
        [Language.th]: '',
      },
      'volleyball': {
        [Language.en]: 'Volleyball',
        [Language.ru]: 'Волейбол',
        [Language.th]: 'วอลเลย์บอล',
      },
    },
  },
  champ: {
    search_by_league_or_city: {
      [Language.en]: 'Search by league or city',
      [Language.ru]: 'Поиск по лиге или городу',
      [Language.th]: 'ค้นหาจากลีกหรือเมือง',
    },
    search_by_city_name: {
      [Language.en]: 'Search by city name',
      [Language.ru]: 'Поиск по названию города',
      [Language.th]: 'ค้นหาจากชื่อเมือง',
    },
    search_by_tournament_name: {
      [Language.en]: 'Search by tournament name',
      [Language.ru]: 'Поиск по названию турнира',
      [Language.th]: 'ค้นหาจากชื่อทัวร์นาเมนต์',
    },
    total_rating: {
      [Language.en]: 'Total rating',
      [Language.ru]: 'Глобальный рейтинг',
      [Language.th]: 'อันดับรวม',
    },
    time_deadlines: {
      [Language.ru]: 'Сроки проведения',
      [Language.en]: 'Interval',
      [Language.th]: 'ช่วงเวลา',
    },
    status_finished: {
      [Language.ru]: 'Завершен',
      [Language.en]: 'Finished',
      [Language.th]: 'จบ',
    },
    status_active: {
      [Language.ru]: 'Идет',
      [Language.en]: 'In progress',
      [Language.th]: 'ดำเนินการ',
    },
    champ: {
      [Language.en]: 'Tournament',
      [Language.ru]: 'Турнир',
      [Language.th]: 'ทัวร์นาเมนต์',
    },
    status: {
      [Language.ru]: 'Статус',
      [Language.en]: 'State',
      [Language.th]: 'สถานะ',
    },
    start_date: {
      [Language.ru]: 'Дата старта',
      [Language.en]: 'Start date',
      [Language.th]: 'วันที่เริ่ม',
    },
    end_date: {
      [Language.ru]: 'Дата окончания',
      [Language.en]: 'Finish date',
      [Language.th]: 'วันที่สิ้นสุด',
    },
    champ_contacts: {
      [Language.ru]: 'Организаторы',
      [Language.en]: 'Contacts',
      [Language.th]: 'ติดต่อ',
    },
    champ_representatives: {
      [Language.ru]: 'Представители',
      [Language.en]: 'Officials',
      [Language.th]: 'เป็นทางการ',
    },
    partners: {
      [Language.ru]: 'Партнеры',
      [Language.en]: 'Partners',
      [Language.th]: 'พันธมิตร',
    },
    position_teams: {
      [Language.ru]: 'Положение команд',
      [Language.en]: 'Standings',
      [Language.th]: 'Standings',
    },
    champ_is_finished: {
      [Language.en]: 'Tournament is finished',
      [Language.ru]: 'Турнир завершён',
      [Language.th]: 'ทัวร์นาเมนต์จบแล้ว',
    },
    champ_not_started: {
      [Language.ru]: 'Турнир ещё не стартовал',
      [Language.en]: "Tournament hasn't started yet",
      [Language.th]: 'ทัวร์นาเมนต์ยังไม่เริ่ม',
    },
    champs: {
      [Language.en]: 'Tournaments',
      [Language.ru]: 'Турниры',
      [Language.th]: 'ทัวร์นาเมนต์',
    },
    all_champs: {
      [Language.en]: 'All tournaments',
      [Language.ru]: 'Все турниры',
      [Language.th]: 'ทัวร์นาเมนต์ทั้งหมด',
    },
    league_champs: {
      [Language.en]: 'League',
      [Language.ru]: 'Турниры лиги',
      [Language.th]: 'ลีก',
    },
    pinned_champs: {
      [Language.en]: 'Pinned',
      [Language.ru]: 'Закреплённые',
      [Language.th]: 'ปักหมุด',
    },
    no_pinned_champs: {
      [Language.en]: "You haven't marked any tournament yet. Press star icon to pin tournament on top of the screen",
      [Language.ru]: 'У вас пока нет сохранённых турниров. Нажмите на звёздочу у турнира чтобы закрепить его вверху экрана',
      [Language.th]: 'คุณยังไม่ได้ปักหมุดทัวร์นาเมนต์ กดที่รูปดาวเพื่อปักหมุดทัวร์นาเมนต์',
    },
    season: {
      [Language.en]: 'Season',
      [Language.ru]: 'Сезон',
      [Language.th]: 'ฤดูกาล',
    },
    season_choice: {
      [Language.ru]: 'Выбор сезона',
      [Language.en]: 'Select season',
      [Language.th]: 'เลือกฤดูกาล',
    },
    seasons: {
      [Language.en]: 'Seasons',
      [Language.ru]: 'Сезоны',
      [Language.th]: 'ฤดูกาล',
    },
    stage_has_no_games: {
      [Language.en]: 'Stage has no games yet',
      [Language.ru]: 'В стадии пока не добавлено ни одной игры',
      [Language.th]: 'เวทีนี้ยังไม่มีเกม',
    },
    search_by_champ_name: {
      [Language.en]: 'Search by champ name',
      [Language.ru]: 'Поиск по названию турнира',
      [Language.th]: 'ค้นหาจากชื่อผู้ชนะ',
    },
    search_by_stage_name: {
      [Language.en]: 'Search by stage name',
      [Language.ru]: 'Поиск по названию стадии',
      [Language.th]: 'ค้นหาจากชื่อเวที',
    },
    search_by_tournament_leagues: {
      [Language.ru]: 'Поиск по турнирам лиги',
      [Language.en]: 'Search league tournaments',
      [Language.th]: 'ค้นหาลีกหรือทัวร์นาเมนต์',
    },
    search_history: {
      [Language.ru]: 'История поиска',
      [Language.en]: 'Search history',
      [Language.th]: 'ประวัติการค้นหา',
    },
    search_history_nothing: {
      [Language.ru]: 'История поиска пуста. Нажмите на иконку 🔎 наверху чтобы найти игроков, команды, турниры и стадионы',
      [Language.en]: 'Search history is empty. Click 🔎 icon to find players, teams, tournaments and stadiums',
      [Language.th]: 'ไม่พบประวัติการค้นหา กดที่ปุ่ม 🔎 เพื่อหาผู้เล่น ทีม ทัวร์นาเมนต์ และสนาม',
    },
    all_stages: {
      [Language.en]: 'All stages',
      [Language.ru]: 'Все стадии',
      [Language.th]: 'เวทีทั้งหทด',
    },
    full_stage: {
      [Language.ru]: 'Полная таблица',
      [Language.en]: 'Full table',
      [Language.th]: 'เวทีใหญ่',
    },
    all_countries: {
      [Language.en]: 'All championships',
      [Language.ru]: 'Все чемпионаты',
      [Language.th]: 'แชมป์เปี้ยนชิพทั้งหมด',
    },
    happy_birthday: {
      [Language.en]: 'Happy birthday!',
      [Language.ru]: 'С днём рождения!',
      [Language.th]: 'สุขสันต์วันเกิด!',
    },
  },
  documents: {
    documents: {
      [Language.en]: 'Documents',
      [Language.ru]: 'Документы',
      [Language.th]: 'เอกสาร',
    },
    search_by_document_title: {
      [Language.en]: 'Search by document title',
      [Language.ru]: 'Поиск по названию документа',
      [Language.th]: 'ค้นหาจากชื่อเอกสาร',
    },
  },
  contacts: {
    [Language.en]: 'Contacts',
    [Language.ru]: 'Контакты',
    [Language.th]: 'ติดต่อ',
  },
  days: {
    [Language.en]: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [Language.ru]: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    [Language.th]: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'],
  },
  days_long: {
    [Language.en]: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    [Language.ru]: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    [Language.th]: ['วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์', 'วันอาทิตย์'],
  },
  months: {
    [Language.en]: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [Language.ru]: ['Янв', 'Фев', 'Мар', 'Апр', 'Мая', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    [Language.th]: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
  },
  months_full: {
    [Language.en]: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    [Language.ru]: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
    [Language.th]: ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'],
  },
  round: {
    [Language.en]: 'round',
    [Language.ru]: 'тур',
    [Language.th]: 'รอบ',
  },
  cup_rounds: {
    [Language.en]: [
      'final',
      'semifinal',
      'quarterfinal',
      '1/8 final',
      '1/16 final',
      '1/32 final',
      '1/64 final',
      '1/128 final',
      '1/3 final',
      '1/6 final',
      '1/12 final',
      'for 3rd place',
    ],
    [Language.ru]: [
      'финал',
      'полуфинал',
      '1/4 финала',
      '1/8 финала',
      '1/16 финала',
      '1/32 финала',
      '1/64 финала',
      '1/128 финала',
      '1/3 финала',
      '1/6 финала',
      '1/12 финала',
      'за 3 место',
    ],
    [Language.th]: [
      'ชิงชนะเลิศ',
      'รองชนะเลิศ',
      'สี่ทีมสุดท้าย',
      '1/8 ทีมสุดท้าย',
      '1/16 ทีมสุดท้าย',
      '1/32 ทีมสุดท้าย',
      '1/64 ทีมสุดท้าย',
      '1/128 ทีมสุดท้าย',
      '1/3 ทีมสุดท้าย',
      '1/6 ทีมสุดท้าย',
      '1/12 ทีมสุดท้าย',
      'รองชนะเลิศอันดับสอง(ที่3)',
    ],
  },
  transfers: {
    transfers: {
      [Language.en]: 'transfers',
      [Language.ru]: 'трансферы',
      [Language.th]: 'โอนย้าย',
    },
    transfer: {
      [Language.ru]: 'Трансфер',
      [Language.en]: 'Transfer',
      [Language.th]: 'โอนย้าย',
    },
    all_transfers: {
      [Language.en]: 'All transfers',
      [Language.ru]: 'Все трансферы',
      [Language.th]: 'โอนย้ายทั้งหมด',
    },
    search_by_player_or_team: {
      [Language.en]: 'Search by player or team',
      [Language.ru]: 'Поиск по игроку или команде',
      [Language.th]: 'ค้นหาจากผู้เล่นหรือทีม',
    },
    since: {
      [Language.en]: 'Since',
      [Language.ru]: 'С',
      [Language.th]: 'ตั้งแต่',
    },
    till: {
      [Language.en]: 'Till',
      [Language.ru]: 'По',
      [Language.th]: 'จนถึง',
    },
    type_transfer: {
      [Language.ru]: 'Тип трансфера',
      [Language.en]: 'Transfer type',
      [Language.th]: 'ประเภทการโอนย้าย',
    },
    send_transfer_request: {
      [Language.ru]: 'Послать запрос на трансфер',
      [Language.en]: 'Send transfer request',
      [Language.th]: 'ส่งคำขอโอนย้าย',
    },
    nothing_transfers: {
      [Language.ru]: 'История трансферов пуста',
    },
    direction: {
      incoming: {
        [Language.en]: 'incoming',
        [Language.ru]: 'на вход',
        [Language.th]: 'เข้ามา',
      },
      outgoing: {
        [Language.en]: 'outgoing',
        [Language.ru]: 'на выход',
        [Language.th]: 'ออกไป',
      },
      to: {
        [Language.en]: 'to',
        [Language.ru]: 'в',
        [Language.th]: 'ไป',
      },
      from: {
        [Language.en]: 'from',
        [Language.ru]: 'из',
        [Language.th]: 'จาก',
      },
    },
    types: {
      roster_remove: {
        [Language.en]: 'removed from roster',
        [Language.ru]: 'удалён из заявки',
        [Language.th]: 'ลบออกจากตาราง',
      },
      create: {
        [Language.en]: 'created',
        [Language.ru]: 'создан',
        [Language.th]: 'สร้าง',
      },
      transfer: {
        [Language.en]: 'transfer',
        [Language.ru]: 'переход',
        [Language.th]: 'โอนย้าย',
      },
      combination: {
        [Language.en]: 'combination',
        [Language.ru]: 'совмещение',
        [Language.th]: 'รวมเข้าด้วยกัน',
      },
      combine: {
        [Language.en]: 'combination',
        [Language.ru]: 'совмещение',
        [Language.th]: 'รวมเข้าด้วยกัน',
      },
      stop_loan: {
        [Language.en]: 'combination finished',
        [Language.ru]: 'конец совмещения',
        [Language.th]: 'การรวมกันสำเร็จ',
      },
      free_transfer: {
        [Language.en]: 'Free transfer',
        [Language.ru]: 'переход свободного агента',
        [Language.th]: 'โอนย้ายฟรี',
      },
    },
    transfer_window_closed: {
      [Language.en]: 'Transfer window is closed',
      [Language.ru]: 'Окно переходов закрыто',
      [Language.th]: 'หมดเวลาการโอนย้าย',
    },
    send_request: {
      [Language.en]: 'Send  request',
      [Language.ru]: 'Отправить запрос',
      [Language.th]: 'ส่งคำขอ',
    },
  },
  load_more: {
    [Language.en]: 'Load more',
    [Language.ru]: 'Загрузить ещё',
    [Language.th]: 'เพิ่มเติม',
  },
  last_update: {
    [Language.en]: 'Updated',
    [Language.ru]: 'Обновлено',
    [Language.th]: 'อัพเดท',
  },
  description: {
    [Language.ru]: 'Описание',
    [Language.en]: 'Description',
    [Language.th]: 'คำอธิบาย',
  },
  app_update: {
    updates_to_be_installed: {
      [Language.en]: 'Some internal updates have to be installed. Please wait.',
      [Language.ru]: 'Необходимо установить некоторые внутренние обновления. Пожалуйста, подождите немного.',
      [Language.th]: 'กำลังทำการปรับปรุงระบบ กรุณารอซักครู่',
    },
    downloading_updates: {
      [Language.en]: 'Downloading updates...',
      [Language.ru]: 'Загрузка обновлений...',
      [Language.th]: 'กำลังดาวโหลดอัพเดท',
    },
    extracting_updates: {
      [Language.en]: 'Extracting updates...',
      [Language.ru]: 'Установка обновлений...',
      [Language.th]: 'กำลังติดตั้ง',
    },
  },
  see_on_the: {
    [Language.ru]: 'Смотреть на',
    [Language.en]: 'Watch on',
  },
  league: {
    info: {
      players: {
        [Language.en]: new Plural(Language.en, 'Player', 'Players'),
        [Language.ru]: new Plural(Language.ru, 'Игрок', 'Игрока', 'Игроков'),
        [Language.th]: new Plural(Language.th, 'ผู้เล่น', 'ผู้เล่น', 'ผู้เล่น'),
      },
      total_rating: {
        [Language.en]: 'Total rating',
        [Language.ru]: 'Общий рейтинг',
        [Language.th]: 'อันดับรวม',
      },
      teams: {
        [Language.en]: new Plural(Language.en, 'Team', 'Teams'),
        [Language.ru]: new Plural(Language.ru, 'Команда', 'Команды', 'Команд'),
        [Language.th]: new Plural(Language.th, 'ทีม', 'ทีม'),
      },
      stadiums: {
        [Language.en]: new Plural(Language.en, 'Stadium', 'Stadiums'),
        [Language.ru]: new Plural(Language.ru, 'Стадион', 'Стадиона', 'Стадионов'),
        [Language.th]: new Plural(Language.th, 'สนาม', 'สนาม'),
      },
      games: {
        [Language.en]: new Plural(Language.en, 'Game', 'Games'),
        [Language.ru]: new Plural(Language.ru, 'Игра', 'Игры', 'Игр'),
        [Language.th]: new Plural(Language.th, 'เกมส์', 'เกมส์'),
      },
      champs: {
        [Language.en]: new Plural(Language.en, 'Champ', 'Champs'),
        [Language.ru]: new Plural(Language.ru, 'Турнир', 'Турнира', 'Турниров'),
        [Language.th]: new Plural(Language.th, 'แชมป์', 'แชมป์'),
      },
    },
    league: {
      [Language.en]: 'League',
      [Language.ru]: 'Лига',
      [Language.th]: 'ลีก',
    },
    select_league: {
      [Language.en]: 'Select league',
      [Language.ru]: 'Выберите лигу',
      [Language.th]: 'เลือกลีก',
    },
    hall_of_fame: {
      [Language.en]: 'Hall of fame',
      [Language.ru]: 'Зал славы',
      [Language.th]: 'หอเกียรติยศ',
    },
    participate: {
      [Language.ru]: 'Участвовать',
      [Language.en]: 'Participate',
    },
    participate_text: {
      [Language.ru]: 'Напишите нам, если хотите заявить команду или ищете команду для себя. Мы перезвоним и подберём для вас лучшие варианты!',
      [Language.en]: 'Contact us if you want to register team or find team to play in. We will call you back and find the best possible option!',
    },
    comment: {
      [Language.ru]: 'Комментарий',
      [Language.en]: 'Comment',
    },
  },
  log_in: {
    welcome_phrase: {
      enter_phone_number: {
        [Language.en]: 'Enter your phone number to log in or sign in',
        [Language.ru]: 'Введите свой номер телефона для регистрации или входа в профиль',
        [Language.th]: 'ระบุเบอร์โทรศัพท์เพื่อเข้าสูระบบหรือสมัครสมาชิก',
      },
      enter_code: {
        [Language.en]: 'Please enter code from SMS',
        [Language.ru]: 'Введите код из СМС',
      },
      no_sms: {
        [Language.en]: 'No SMS received? Log in via',
        [Language.ru]: 'СМС не приходит? Войдите через',
      },
      go_back: {
        [Language.en]: 'Go back',
        [Language.ru]: 'Вернуться назад',
      },
      back_to_app: {
        [Language.en]: 'Back to app',
        [Language.ru]: 'Вернуться в приложение',
      },
      repeat_code: {
        [Language.ru]: 'Отправить код повторно',
        [Language.en]: 'Send again',
        [Language.th]: 'ส่งอีกครั้ง',
      },
      please: {
        [Language.en]: 'Please',
        [Language.ru]: 'Пожалуйста',
        [Language.th]: 'กรุณา',
      },
      sign_in: {
        [Language.en]: 'sign in',
        [Language.ru]: 'войдите',
        [Language.th]: 'เข้าสูระบบ',
      },
      sign_in_with_socials: {
        [Language.ru]: 'Войти через соц. сети',
        [Language.en]: 'Log in via socials',
      },
      to_personalize_feed: {
        [Language.en]: 'to personalize your newsfeed adn subscribe to favorite teams and players',
        [Language.ru]: 'чтобы настроить собственную ленту новостей и подписаться на любимых игроков и команды',
        [Language.th]: 'เพื่อปรับแต่งฟีดข่าวของคุณ กรุณาเลือกทีมและผู้เล่นที่ชื่นชอบ',
      },
      provide_name: {
        [Language.en]: 'Please provide your name so we can find associated player profiles ',
        [Language.ru]: 'Пожалуйста укажите своё имя, чтобы мы могли найти связанные профили игроков',
        [Language.th]: 'โปรดระบุชื่อของคุณเพื่อให้ระบบค้นหาผู้เล่นที่เกี่ยวข้อง',
      },
      search_for_more_subscriptions: {
        [Language.en]: 'Search players and teams',
        [Language.ru]: 'Поиск игроков и команд',
        [Language.th]: 'ค้นหาผู้เล่นและทีม',
      },
      we_found_subscriptions: {
        [Language.en]: "We've found some subscriptions for you. Remove checkmark from entities that you aren't interested in. Use search to add more players and teams to follow.",
        [Language.ru]:
          'Мы нашли для Вас несколько подписок. Удалите галочку у тех, которые Вас не интересуют. Воспользуйтесь поиском чтобы добавить игроков и команды, за которыми хотите следить',
        [Language.th]: 'เราพบการสมัครรับข้อมูลของคุณ สามารถนำเครื่องหมายออกเพื่อยกเลิกการรับข่าวสาร ใช้การค้นหาเพื่อติดตามผู้เล่นหรือทีม',
      },
      no_found_subscriptions: {
        [Language.en]:
          'No player profiles with your name found. Go back to edit name or city or add subscriptions manually using search. You can also skip this step and add subscriptions later',
        [Language.ru]: 'Мы не смогли найти игроков с вашим именем. Вернитесь назад чтобы именить имя/город, или',
        [Language.th]:
          'ไม่มีผู้เล่นที่เกี่ยวข้องกับชื่อของคุณ กลับไปแก้ไขชื่อ เมือง หรือเพิ่มการรับข่าวสารด้วยตนเองจากการค้นหา คุณสามารถข้ามขั้นตอนนี้และทำการเพิ่มการรับข่าวสารในภายหลัง',
      },
      subscribe_ok: {
        [Language.en]: 'Great! Now you are subscribed to selected items. Allow push notifications to catch all latest updates',
        [Language.ru]: 'Супер! Теперь вы подписаны на выбранные элементы. Разрешите пуш-уведомления чтобы быть в курсе всех обновлений',
        [Language.th]: 'สุดยอด! ตอนนี้คุณสมัครรับข่าวสารตามที่เลือกเรียบร้อยแล้ว กรุณาเปิดการแจ้งเตือนเพื่อรับข่าวสารใหม่ๆเสมอ',
      },
      subscribe_nothing: {
        [Language.en]: 'No subscriptions created. No worries - you can add them later. Allow push notifications to receive important updates',
        [Language.ru]:
          'Вы пока ни на что не подписаны. Ничего страшного, вы сможете добавить подписки в любой момент. Включите пуш-уведомления, чтобы не пропустить важные обновления',
        [Language.th]: 'ไม่มีการามัครรับข่าวสาร ไม่เป็นไร คุณสามารถสมัครภายหลังได้ กรุณาเปิดการแจ้งเตือนเพื่อรับข่าวสารสำคัญ',
      },
      not_access_captain_for_link: {
        [Language.ru]:
          'Вы перешли по ссылке для капитана, однако вам не выдано соответствующего доступа. Обратитесь к администратору вашего турнира для предоставления вам капитанских прав.',
        [Language.en]: 'This link is for captain use only. Contact your league administrator for details',
        [Language.th]: '',
      },
    },
    account_search: {
      searching_for_your_player_accounts: {
        [Language.en]: 'Searching for your player accounts...',
        [Language.ru]: 'Ищем ваши аккаунты игроков...',
        [Language.th]: 'ค้นหาผู้เล่นสำหรับแอคเค๊าของคุณ',
      },
      no_accounts_found: {
        [Language.en]: 'No player records with your name found.',
        [Language.ru]: 'Не найдено игроков с вашим именем',
        [Language.th]: 'ไม่พบบันทึกผู้เล่นที่มีชื่อของคุณ',
      },
      try: {
        [Language.en]: 'Try to',
        [Language.ru]: 'Попробуйте',
        [Language.th]: 'ลอง',
      },
      change_name_or_city: {
        [Language.en]: 'change name or city',
        [Language.ru]: 'изменить имя или город',
        [Language.th]: 'เปลี่ยนชื่อหรือเมือง',
      },
      or: {
        [Language.en]: 'or',
        [Language.ru]: 'или',
        [Language.th]: 'หรือ',
      },
      manually_search_players_teams: {
        [Language.en]: 'Manually search for players and teams you want to follow',
        [Language.ru]: 'Вручную найдите игроков и команды, за которыми хотите следить',
        [Language.th]: 'ค้นหาด้วยตนเองสำหรับผู้เล่นและทีมที่คุณต้องการติดตาม',
      },
    },
    phone_number: {
      [Language.en]: 'Your phone number',
      [Language.ru]: 'Ваш номер телефона',
      [Language.th]: 'เบรอ์โทรศัพท์ของคุณ',
    },
    incorrect_phone_format: {
      [Language.en]: 'Incorrect phone format',
      [Language.ru]: 'Некорректный формат телефона',
      [Language.th]: 'เบอร์โทรศัพท์ไม่ถูกต้อง',
    },
    no_user_with_phone_found: {
      [Language.en]: 'No user with such phone found',
      [Language.ru]: 'Пользователь с этим номером не найден',
      [Language.th]: 'ไม่มีผู้ใช้งานที่ใช้เบอร์โทรศัพท์นี้',
    },
    send_sms: {
      [Language.en]: 'Send SMS',
      [Language.ru]: 'Послать СМС',
      [Language.th]: 'ส่ง sms',
    },
    code_from_sms: {
      [Language.en]: 'Code from SMS',
      [Language.ru]: 'Код из СМС',
      [Language.th]: 'รหัสจาก sms',
    },
    code_should_have_6_digits: {
      [Language.en]: 'Code should be 6 digits long',
      [Language.ru]: 'Код должен быть длиной в 6 символов',
      [Language.th]: 'รหัสมีทั้งหมด 6 หลัก',
    },
    incorrect_code: {
      [Language.en]: 'Incorrect code',
      [Language.ru]: 'Неверный код',
      [Language.th]: 'รหัสไม่ถูกต้อง',
    },
    or_sign_in_with: {
      [Language.en]: 'Or sign in with',
      [Language.ru]: 'Или войдите через',
      [Language.th]: 'หรือเข้าสู่ระบบด้วย',
    },
    ive_read_and_accepted: {
      [Language.en]: "I've read and agreed with",
      [Language.ru]: 'Я прочитал и принял',
      [Language.th]: 'ฉันได้อ่านและยอมรับ',
    },
    read: {
      [Language.en]: 'Read',
      [Language.ru]: 'Читать',
      [Language.th]: 'อ่าน',
    },
    license_agreement: {
      [Language.en]: 'License agreement',
      [Language.ru]: 'Пользовательское соглашение',
      [Language.th]: 'ข้อตกลง',
    },
    license_accepted: {
      [Language.ru]: 'Ознакомлен с правилами',
      [Language.en]: 'Agree with all terms',
      [Language.th]: 'ยอมรับทุกข้อกำหนด',
    },
    cookie_policy: {
      [Language.en]: 'Cookie policy',
      [Language.ru]: 'Использование cookies',
      [Language.th]: 'คุ้กกี้และข้อกำหนด',
    },
    accept_and_continue: {
      [Language.en]: 'Accept and continue',
      [Language.ru]: 'Принять и продолжить',
      [Language.th]: 'ยอมรับและดำเนินการต่อ',
    },
    log_out: {
      [Language.en]: 'Log out',
      [Language.ru]: 'Выйти',
      [Language.th]: 'ออกจากระบบ',
    },
    confirm_log_out: {
      [Language.en]: 'Confirm log out',
      [Language.ru]: 'Подтвердите выход',
      [Language.th]: 'ยืนยันการออกจากระบบ',
    },
    login: {
      [Language.en]: 'Login',
      [Language.ru]: 'Логин',
      [Language.th]: 'เข้าสู่ระบบ',
    },
  },
  favorites: {
    favorites: {
      [Language.ru]: 'Избранное',
      [Language.en]: 'Favorites',
      [Language.th]: 'ที่ชื่อชอบ',
    },
    personal_newsfeed: {
      [Language.en]: 'Personal newsfeed',
      [Language.ru]: 'Лента новостей',
      [Language.th]: 'ฟีดข่าวส่วนตัว',
    },
    news_by_tags: {
      [Language.en]: 'Display news by following tags',
      [Language.ru]: 'Показать новости по тегам',
      [Language.th]: 'แสดงข่าวตามที่เลือก',
    },
    all_tags: {
      [Language.en]: 'All tags',
      [Language.ru]: 'Все теги',
      [Language.th]: 'แท็กทั้งหมด',
    },
    subscribed_to: {
      [Language.en]: 'Subscribed to',
      [Language.ru]: 'Подписки',
      [Language.th]: 'กดติดตาม',
    },
    subscribed: {
      [Language.en]: 'subscribed',
      [Language.ru]: 'вы подписаны',
      [Language.th]: 'ติดตาม',
    },
    add_subscriptions: {
      [Language.ru]: 'Добавление подписок',
      [Language.en]: 'Add subscriptions',
      [Language.th]: 'เพิ่มการติดตาม',
    },
    search_new_subscription: {
      [Language.ru]: 'Поиск новой подписки',
      [Language.en]: 'Search new subscription',
      [Language.th]: 'ค้นหาการติดตามใหม่',
    },
    add_subscriptions_description: {
      [Language.ru]: 'Добавьте игроков, команды и турниры за которыми хотите следить',
      [Language.en]: 'Add players, teams and Добавьте игроков, команды и турниры за которыми хотите следить',
      [Language.th]: '???????????',
    },
    notifications_enabled: {
      [Language.en]: 'Browser notifications enabled',
      [Language.ru]: 'Уведомления браузера включены',
      [Language.th]: 'เปิดการแจ้งเตือนเบร๊าเซอร์',
    },
    click_to_subscribe_team: {
      [Language.en]: 'CLick on this icon to add team to favorites',
      [Language.ru]: 'Кликните на эту иконку чтобы добавить команду в любимые',
      [Language.th]: 'กดที่ปุ่มนี้เพื่อเพิ่มทีมที่ชื่อชอบ',
    },
    click_to_subscribe_player: {
      [Language.en]: 'CLick on this icon to add player to favorites',
      [Language.ru]: 'Кликните на эту иконку чтобы добавить игрока в любимые',
      [Language.th]: 'กดที่ปุ่มนี้เพื่อเพิ่มผู้เล่นที่ชื่อชอบ',
    },
    new_subscription: {
      [Language.en]: 'New subscription',
      [Language.ru]: 'Новая подписка',
      [Language.th]: 'การติดตามใหม่',
    },
  },
  validators: {
    field_cannot_be_empty: {
      [Language.en]: 'Field cannot be empty',
      [Language.ru]: 'Поле не может быть пустым',
      [Language.th]: 'ไม่สามารถปล่อยว่างได้',
    },
    should_be_positive_number: {
      [Language.en]: 'Should be positive number',
      [Language.ru]: 'Число должно быть больше ноля',
      [Language.th]: 'ต้องเป็นค่าบวกเท่านั้น',
    },
    should_be_between_1_100: {
      [Language.en]: 'Number should be between 1 and 100',
      [Language.ru]: 'Номер должен иметь значение от 1 до 100',
    },
    invalid_date_format: {
      [Language.en]: 'should have format DD.MM.YYYY',
      [Language.ru]: 'требуемый формат: DD.MM.YYYY',
    },
    invalid_be_empty: {
      [Language.en]: "shouldn't be empty",
      [Language.ru]: 'не может быть пустым',
    },
    invalid_time_format: {
      [Language.en]: 'Invalid time format',
      [Language.ru]: 'Неверный формат времени',
      [Language.th]: 'รูปแบบเวลาผิดพลาด',
    },
    allowed_range: {
      [Language.en]: 'Allowed range',
      [Language.ru]: 'Разрешённый диапазон',
      [Language.th]: 'ช่วงที่อนุญาต',
    },
    phone_should_start_with_plus: {
      [Language.en]: 'Number should start with plus sign',
      [Language.ru]: 'Номер должен начинаться со знака плюс',
      [Language.th]: 'ตัวเลขต้องเริ่มจากเครื่องหมายบวก',
    },
    invalid_phone_format: {
      [Language.en]: 'Invalid phone format',
      [Language.ru]: 'Неверный формат телефона',
      [Language.th]: 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง',
    },
    code_should_have_6_digits: {
      [Language.en]: 'Code should be 6 digits long',
      [Language.ru]: 'Код должен быть 6 символов в длину',
      [Language.th]: 'รหัสต้องมี 6 ตัวอักษร',
    },
  },
  explore: {
    explore: {
      [Language.en]: 'Explore',
      [Language.ru]: 'Поиск',
      [Language.th]: 'สำรวจ',
    },
    recommended: {
      [Language.en]: 'Recommended',
      [Language.ru]: 'Рекомендовано',
      [Language.th]: 'แนะนำ',
    },
  },
  profile: {
    profile: {
      [Language.en]: 'Profile',
      [Language.ru]: 'Профиль',
      [Language.th]: 'โพรไฟล์',
    },
    user_roles: {
      [Language.ru]: 'Роли пользователя',
      [Language.en]: 'User roles',
      [Language.th]: 'โรลผู้ใช้งาน',
    },
    characteristic: {
      [Language.ru]: 'Характеристики',
      [Language.en]: 'Parameters',
      [Language.th]: 'พารามิเตอร์',
    },
    profile_info: {
      [Language.en]: 'Profile info',
      [Language.ru]: 'Инфо профиля',
      [Language.th]: 'ข้อมูลโพรไฟล์',
    },
    review: {
      [Language.ru]: 'Обзор',
      [Language.en]: 'Overview',
      [Language.th]: 'ภาพรวม',
    },
    edit_profile: {
      [Language.en]: 'Edit Profile',
      [Language.ru]: 'Настройки профиля',
      [Language.th]: 'แก้ไขโพรไฟล์',
    },
    create_profile: {
      [Language.en]: 'Create profile',
      [Language.ru]: 'Создание профиля',
      [Language.th]: 'สร้างโพรไฟล์',
    },
    name: {
      [Language.en]: 'Your name',
      [Language.ru]: 'Ваше имя',
      [Language.th]: 'ชื่อของคุณ',
    },
    city: {
      [Language.en]: 'Your city',
      [Language.ru]: 'Ваш город',
      [Language.th]: 'เมืองของคุณ',
    },
    city_short: {
      [Language.ru]: 'Город',
      [Language.en]: 'City',
      [Language.th]: 'เมือง',
    },
    app_info: {
      [Language.en]: 'App info',
      [Language.ru]: 'Данные приложения',
      [Language.th]: 'ข้อมูลแอพ',
    },
    version: {
      [Language.en]: 'Version',
      [Language.ru]: 'Версия',
      [Language.th]: 'เวอร์ชั่น',
    },
    subscriptions: {
      [Language.en]: 'Subscriptions',
      [Language.ru]: 'Подписки',
      [Language.th]: 'การติดตาม',
    },
    loading_recommendations: {
      [Language.en]: 'Loading recommended subscriptions...',
      [Language.ru]: 'Загружаем рекомендованные подписки...',
    },
    new_subscriptions: {
      [Language.en]: 'New subscription',
      [Language.ru]: 'Новая подписка',
      [Language.th]: 'การติดตามใหม่',
    },
    manage_subscriptions: {
      [Language.en]: 'Manage subscriptions',
      [Language.ru]: 'Управление подписками',
      [Language.th]: 'จัดดการการติดตาม',
    },
    current_subscriptions: {
      [Language.en]: 'Current subscriptions',
      [Language.ru]: 'Текущие подписки',
      [Language.th]: 'การติดตามที่มีอยู่',
    },
    found_subscriptinos: {
      [Language.en]: 'Found subscriptions',
      [Language.ru]: 'Найденные подписки',
      [Language.th]: 'เจอการติดตาม',
    },
    no_subscriptions: {
      [Language.en]: 'No subscriptions added. Find favorite teams and players to receive related news',
      [Language.ru]: 'Подписки не добавлены. Найдите любимые команды и игроков чтобы получать новости о них',
      [Language.th]: 'ไม่มีการเพิ่มการติดตาม ค้นหาทีมและผู้เล่นที่ชื่อชอบเพื่อติดตามละรับข่าวสารที่เกี่ยวข้อง',
    },
    search_teams_or_players: {
      [Language.en]: 'Search teams or players by name',
      [Language.ru]: 'Ищите команду или игрока по имени',
      [Language.th]: 'ค้นหาทีมหรือผู้เล่นจากชื่อ',
    },
    language: {
      [Language.en]: 'Language',
      [Language.ru]: 'Язык',
      [Language.th]: 'ภาษา',
    },
    unsubscribe: {
      [Language.en]: 'Unsubscribe',
      [Language.ru]: 'Отписаться',
      [Language.th]: 'เลิกติดตาม',
    },
    subscribe: {
      [Language.en]: 'Subscribe',
      [Language.ru]: 'Подписаться',
      [Language.th]: 'ติดตาม',
    },
    tap_to_edit_photo: {
      [Language.en]: 'Tap to upload photo',
      [Language.ru]: 'Нажмите чтобы загрузить фото',
      [Language.th]: 'กดเพื่ออัพโหลดรูปภาพ',
    },
    pushes_enabled: {
      [Language.en]: 'Push notifications',
      [Language.ru]: 'Пуш-уведомления',
      [Language.th]: 'การแจ้งเตือน',
    },
    error_registering_push: {
      [Language.en]: 'Token registration error',
      [Language.ru]: 'Ошибка регистрации токена',
      [Language.th]: 'มีข้อผิดพลาดเกี่ยวกับโทเค่นการสมัคร',
    },
    theme: {
      [Language.en]: 'Color theme',
      [Language.ru]: 'Цветовая тема',
      [Language.th]: 'ธีมสี',
    },
    theme_light: {
      [Language.en]: 'Light',
      [Language.ru]: 'Светлая',
      [Language.th]: 'สว่าง',
    },
    theme_dark: {
      [Language.en]: 'Dark',
      [Language.ru]: 'Тёмная',
      [Language.th]: 'มืด',
    },
    theme_system: {
      [Language.en]: 'System',
      [Language.ru]: 'Системная',
      [Language.th]: 'ระบบ',
    },
    logout: {
      [Language.en]: 'Log out',
      [Language.ru]: 'Выйти',
      [Language.th]: 'ออกจากระบบ',
    },
  },
  igraphics: {
    quote: {
      [Language.en]: 'Quote',
      [Language.ru]: 'Цитата',
      [Language.th]: 'อ้างอิง',
    },
  },
  calendar: {
    calendar: {
      [Language.en]: 'Calendar',
      [Language.ru]: 'Календарь',
      [Language.th]: '',
    },
    all_events: {
      [Language.en]: 'All events',
      [Language.ru]: 'Все события',
      [Language.th]: '',
    },
    my_calendar: {
      [Language.en]: 'My calendar',
      [Language.ru]: 'Мой календарь',
      [Language.th]: '',
    },
    from: {
      [Language.en]: 'From',
      [Language.ru]: 'От',
      [Language.th]: '',
    },
    to: {
      [Language.en]: 'To',
      [Language.ru]: 'До',
      [Language.th]: '',
    },
    no_events_for_interval: {
      [Language.en]: 'No events for selected time interval found',
      [Language.ru]: 'Не найдено событий в выбранном интервале',
    },
  },
  hall_of_fame: {
    calculating: {
      [Language.en]: 'Calculating best',
      [Language.ru]: 'Вычисляем лучших',
      [Language.th]: '',
    },
    dynamics: {
      [Language.en]: 'Dynamics for',
      [Language.ru]: 'Динамика за',
      [Language.th]: '',
    },
    interval: {
      week: {
        [Language.en]: 'Week',
        [Language.ru]: 'Неделя',
        [Language.th]: '',
      },
      month: {
        [Language.en]: 'Month',
        [Language.ru]: 'Месяц',
        [Language.th]: '',
      },
      year: {
        [Language.en]: 'Year',
        [Language.ru]: 'Год',
        [Language.th]: '',
      },
    },
    all_countries: {
      [Language.en]: 'All countries',
      [Language.ru]: 'Все страны',
      [Language.th]: '',
    },
    position: {
      [Language.en]: new Plural(Language.en, 'position', 'positions'),
      [Language.ru]: new Plural(Language.ru, 'позиция', 'позиции', 'позиций'),
      [Language.th]: new Plural(Language.th, '', '', ''),
    },
    in_interval: {
      in_week: {
        [Language.en]: 'in last week',
        [Language.ru]: 'за неделю',
        [Language.th]: '',
      },
      in_month: {
        [Language.en]: 'in last month',
        [Language.ru]: 'за месяц',
        [Language.th]: '',
      },
      in_year: {
        [Language.en]: 'in last year',
        [Language.ru]: 'за год',
        [Language.th]: '',
      },
    },
    area: {
      league: {
        [Language.en]: 'League',
        [Language.ru]: 'Лига',
        [Language.th]: '',
      },
      city: {
        [Language.en]: 'City',
        [Language.ru]: 'Город',
        [Language.th]: '',
      },
      country: {
        [Language.en]: 'Country',
        [Language.ru]: 'Страна',
        [Language.th]: '',
      },
      whole_world: {
        [Language.en]: 'Whole world',
        [Language.ru]: 'Весь мир',
        [Language.th]: '',
      },
    },
    display_by: {
      display_by: {
        [Language.en]: 'Display by',
        [Language.ru]: 'Показывать по',
        [Language.th]: '',
      },
      by_period: {
        [Language.en]: 'By period',
        [Language.ru]: 'За период',
        [Language.th]: '',
      },
      league: {
        [Language.en]: 'League',
        [Language.ru]: 'Лиге',
        [Language.th]: '',
      },
      city: {
        [Language.en]: 'City',
        [Language.ru]: 'Городу',
        [Language.th]: '',
      },
      country: {
        [Language.en]: 'Country',
        [Language.ru]: 'Стране',
        [Language.th]: '',
      },
      whole_world: {
        [Language.en]: 'Whole world',
        [Language.ru]: 'Всему миру',
        [Language.th]: '',
      },
    },
    sport_type: {
      [Language.en]: 'Sports',
      [Language.ru]: 'Вид спорта',
      [Language.th]: '',
    },
  },
  pin: {
    set_pin_phrase: {
      [Language.en]: 'Great! Now set up pin code to authenticate in the future',
      [Language.ru]: 'Отлично! Теперь придумайте пин, по которому будете авторизоваться в будущем',
      [Language.th]: '',
    },
    enter_pin: {
      [Language.en]: 'Enter your pin',
      [Language.ru]: 'Введите ваш пин',
      [Language.th]: '',
    },
    log_in_sms: {
      [Language.en]: 'Log in via sms',
      [Language.ru]: 'Войти через смс',
      [Language.th]: '',
    },
    set_pin: {
      [Language.en]: 'Set up pin code',
      [Language.ru]: 'Установить пин',
      [Language.th]: '',
    },
    skip: {
      [Language.en]: 'Skip pin set up',
      [Language.ru]: 'Не устанавливать',
      [Language.th]: '',
    },
  },
};
