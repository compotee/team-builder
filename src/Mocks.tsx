export interface TeamMember {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  role: string;
  tg_link: string;
}

export interface Team {
  id: number;
  members: TeamMember[];
}

export interface Distribution {
  id: number;
  name: string;
  max_members_team: number;
  possible_roles: string[];
  status: string;
  auto_finish_date: string;
  auto_finish_time: string;
  team_expiry_date: string;
  invite_link: string;
  is_admin: boolean;
  members?: TeamMember[];
  teams?: Team[];
}

export const Role = ['Тимлид', 'Аналитик', 'Дизайнер', 'Frontend-разработчик', 'Backend-разработчик'];

export const DistributionStatus = ['active', 'completed', 'end'];

export const Experience = [
  "Нет практического опыта",
  "До полугода", 
  "От полугода до года",
  "Более одного года менее трёх лет",
  "Более трёх лет"
];

export const Members: TeamMember[] = [
  // Role[0] - Тимлид
  {
    id: 1,
    firstName: "Марина",
    middleName: "Александровна",
    lastName: "Попова",
    role: Role[0],
    tg_link: "wumsha"
  },
  {
    id: 2,
    firstName: "Иван",
    middleName: "Иванович",
    lastName: "Иванов",
    role: Role[0],
    tg_link: "ivanov"
  },
  {
    id: 6,
    firstName: "Дмитрий",
    middleName: "Олегович",
    lastName: "Смирнов",
    role: Role[0],
    tg_link: "dsmirnov"
  },
  {
    id: 16,
    firstName: "Андрей",
    middleName: "Николаевич",
    lastName: "Михайлов",
    role: Role[0],
    tg_link: "amikhailov"
  },
  {
    id: 21,
    firstName: "Светлана",
    middleName: "Борисовна",
    lastName: "Орлова",
    role: Role[0],
    tg_link: "sorlova"
  },
  {
    id: 26,
    firstName: "Станислав",
    middleName: "Вячеславович",
    lastName: "Захаров",
    role: Role[0],
    tg_link: "szakharov"
  },
  
  // Role[1] - Аналитик
  {
    id: 3,
    firstName: "Анна",
    middleName: "Сергеевна",
    lastName: "Петрова",
    role: Role[1],
    tg_link: "anna_petrova"
  },
  {
    id: 7,
    firstName: "Ольга",
    middleName: "Владимировна",
    lastName: "Кузнецова",
    role: Role[1],
    tg_link: "okuznetsova"
  },
  {
    id: 12,
    firstName: "Павел",
    middleName: "Сергеевич",
    lastName: "Виноградов",
    role: Role[1],
    tg_link: "pvinogradov"
  },
  {
    id: 17,
    firstName: "Виктория",
    middleName: "Павловна",
    lastName: "Беляева",
    role: Role[1],
    tg_link: "vbelyaeva"
  },
  {
    id: 22,
    firstName: "Григорий",
    middleName: "Леонидович",
    lastName: "Киселев",
    role: Role[1],
    tg_link: "gkiselev"
  },
  {
    id: 27,
    firstName: "Людмила",
    middleName: "Георгиевна",
    lastName: "Зайцева",
    role: Role[1],
    tg_link: "lzaytseva"
  },
  
  // Role[2] - Дизайнер
  {
    id: 5,
    firstName: "Елена",
    middleName: "Дмитриевна",
    lastName: "Козлова",
    role: Role[2],
    tg_link: "elena_kozlova"
  },
  {
    id: 8,
    firstName: "Алексей",
    middleName: "Петрович",
    lastName: "Васильев",
    role: Role[2],
    tg_link: "avassilyev"
  },
  {
    id: 13,
    firstName: "Юлия",
    middleName: "Анатольевна",
    lastName: "Богданова",
    role: Role[2],
    tg_link: "ybogdanova"
  },
  {
    id: 18,
    firstName: "Константин",
    middleName: "Аркадьевич",
    lastName: "Тарасов",
    role: Role[2],
    tg_link: "ktarasov"
  },
  {
    id: 23,
    firstName: "Мария",
    middleName: "Станиславовна",
    lastName: "Макарова",
    role: Role[2],
    tg_link: "mmakarova"
  },
  {
    id: 28,
    firstName: "Георгий",
    middleName: "Федорович",
    lastName: "Соловьев",
    role: Role[2],
    tg_link: "gsolovyev"
  },
  
  // Role[3] - Frontend-разработчик
  {
    id: 4,
    firstName: "Сергей",
    middleName: "Викторович",
    lastName: "Сидоров",
    role: Role[3],
    tg_link: "sidorov"
  },
  {
    id: 9,
    firstName: "Татьяна",
    middleName: "Михайловна",
    lastName: "Павлова",
    role: Role[3],
    tg_link: "tpavlova"
  },
  {
    id: 14,
    firstName: "Артем",
    middleName: "Денисович",
    lastName: "Воробьев",
    role: Role[3],
    tg_link: "avorobyev"
  },
  {
    id: 19,
    firstName: "Алиса",
    middleName: "Романовна",
    lastName: "Белова",
    role: Role[3],
    tg_link: "abelova"
  },
  {
    id: 24,
    firstName: "Владислав",
    middleName: "Геннадьевич",
    lastName: "Андреев",
    role: Role[3],
    tg_link: "vandreev"
  },
  {
    id: 29,
    firstName: "Валерия",
    middleName: "Андреевна",
    lastName: "Ершова",
    role: Role[3],
    tg_link: "vershova"
  },
  
  // Role[4] - Backend-разработчик
  {
    id: 10,
    firstName: "Михаил",
    middleName: "Андреевич",
    lastName: "Семенов",
    role: Role[4],
    tg_link: "msemenov"
  },
  {
    id: 15,
    firstName: "Екатерина",
    middleName: "Валерьевна",
    lastName: "Федорова",
    role: Role[4],
    tg_link: "efedorova"
  },
  {
    id: 20,
    firstName: "Роман",
    middleName: "Витальевич",
    lastName: "Комаров",
    role: Role[4],
    tg_link: "rkomarov"
  },
  {
    id: 25,
    firstName: "Ксения",
    middleName: "Владиславовна",
    lastName: "Николаева",
    role: Role[4],
    tg_link: "knikolaeva"
  },
  {
    id: 30,
    firstName: "Никита",
    middleName: "Ильич",
    lastName: "Тихонов",
    role: Role[4],
    tg_link: "ntikhonov"
  },
  {
    id: 31,
    firstName: "Артур",
    middleName: "Русланович",
    lastName: "Давыдов",
    role: Role[4],
    tg_link: "adavydov"
  }
];

export const Competence = [
  {
    id: 0,
    role: Role[3],
    stack: "React, TypeScript",
    experience: Experience[3],
  },
  {
    id: 1,
    role: Role[1],
    stack: "Составление отчета, работа в YouGile",
    experience: Experience[2],
  },
];

export const User = {
  id: 1,
  firstName: "Марина",
  middleName: "Александровна",
  lastName: "Попова",
  username: "wunsha",
  tgLink: "wunsha",
  password: "123456789",
  competence: Competence
};

export const Distributions: Distribution[] = [
  // Вид 1: is_admin: false, status: 'active' (нет members и нет teams) - 2 шт
  {
    id: 1,
    name: 'Разработка мобильного приложения',
    max_members_team: 5,
    possible_roles: Role,
    status: DistributionStatus[0], // active
    auto_finish_date: '2026-03-15',
    auto_finish_time: '12:00',
    team_expiry_date: '2026-06-20',
    invite_link: 'invite-mobile-app-1',
    is_admin: false,
    // Нет members и teams
  },
  {
    id: 2,
    name: 'Создание образовательной платформы',
    max_members_team: 5,
    possible_roles: Role,
    status: DistributionStatus[0], // active
    auto_finish_date: '2026-03-25',
    auto_finish_time: '18:00',
    team_expiry_date: '2026-06-10',
    invite_link: 'invite-edu-platform-1',
    is_admin: false,
    // Нет members и teams
  },

  // Вид 2: is_admin: false, status: 'completed' (нет members, но есть teams) - 2 шт
  {
    id: 3,
    name: 'Разработка корпоративного сайта',
    max_members_team: 5,
    possible_roles: Role,
    status: DistributionStatus[1], // completed
    auto_finish_date: '2026-01-20',
    auto_finish_time: '10:00',
    team_expiry_date: '2026-03-15',
    invite_link: 'invite-corp-site-1',
    is_admin: false,
    // Нет members
    teams: [
      {
        id: 101,
        members: [
          Members[0],  // Тимлид
          Members[6],  // Аналитик
          Members[12], // Дизайнер
          Members[18], // Frontend
          Members[24]  // Backend
        ]
      },
      {
        id: 102,
        members: [
          Members[1],  // Тимлид
          Members[7],  // Аналитик
          Members[13], // Дизайнер
          Members[19], // Frontend
          Members[25]  // Backend
        ]
      },
      {
        id: 103,
        members: [
          Members[2],  // Тимлид
          Members[8],  // Аналитик
          Members[14], // Дизайнер
          Members[20], // Frontend
          Members[26]  // Backend
        ]
      }
    ]
  },
  {
    id: 4,
    name: 'Разработка интернет-магазина',
    max_members_team: 5,
    possible_roles: Role,
    status: DistributionStatus[1], // completed
    auto_finish_date: '2026-01-10',
    auto_finish_time: '19:00',
    team_expiry_date: '2026-03-25',
    invite_link: 'invite-ecommerce-1',
    is_admin: false,
    // Нет members
    teams: [
      {
        id: 104,
        members: [
          Members[0],  // Тимлид
          Members[9],  // Аналитик
          Members[15], // Дизайнер
          Members[21], // Frontend
          Members[27]  // Backend
        ]
      },
      {
        id: 105,
        members: [
          Members[4],   // Тимлид
          Members[10],  // Аналитик
          Members[16],  // Дизайнер
          Members[22],  // Frontend
          Members[28]   // Backend
        ]
      }
    ]
  },

  // Вид 3: is_admin: true, status: 'active' (есть members, но нет teams) - 2 шт
  {
    id: 5,
    name: 'Разработка CRM системы',
    max_members_team: 5,
    possible_roles: Role,
    status: DistributionStatus[0], // active
    auto_finish_date: '2026-03-05',
    auto_finish_time: '12:00',
    team_expiry_date: '2026-06-30',
    invite_link: 'invite-crm-system-1',
    is_admin: true,
    members: [
      Members[23], Members[1], Members[2], Members[3], Members[4],
      Members[5], Members[6], Members[7], Members[8], Members[9],
      Members[10], Members[11], Members[12]
    ], // 13 участников
    // Нет teams
  },
  {
    id: 6,
    name: 'Создание аналитической панели',
    max_members_team: 5,
    possible_roles: Role,
    status: DistributionStatus[0], // active
    auto_finish_date: '2026-03-28',
    auto_finish_time: '18:00',
    team_expiry_date: '2026-06-05',
    invite_link: 'invite-analytics-1',
    is_admin: true,
    members: [
      Members[14], Members[15], Members[16], Members[17], Members[18],
      Members[19], Members[20], Members[21], Members[22]
    ], // 9 участников
    // Нет teams
  },

  // Вид 4: is_admin: true, status: 'completed' (нет members, но есть teams, team[0] отсутствует) - 2 шт
  {
    id: 7,
    name: 'Разработка API платформы',
    max_members_team: 5,
    possible_roles: Role,
    status: DistributionStatus[1], // completed
    auto_finish_date: '2026-01-15',
    auto_finish_time: '10:00',
    team_expiry_date: '2026-03-20',
    invite_link: 'invite-api-platform-1',
    is_admin: true,
    // Нет members
    teams: [
      // team[0] отсутствует - начинаем с id: 201
      {
        id: 201,
        members: [
          Members[5],   // Тимлид
          Members[11],  // Аналитик
          Members[17],  // Дизайнер
          Members[23],  // Frontend
          Members[29]   // Backend
        ]
      },
      {
        id: 202,
        members: [
          Members[3],  // Тимлид
          Members[6],  // Аналитик
          Members[12], // Дизайнер
          Members[18], // Frontend
          Members[24]  // Backend
        ]
      },
      {
        id: 203,
        members: [
          Members[1],  // Тимлид
          Members[7],  // Аналитик
          Members[13], // Дизайнер
          Members[19], // Frontend
          Members[25]  // Backend
        ]
      },
      {
        id: 204,
        members: [
          Members[2],  // Тимлид
          Members[8],  // Аналитик
          Members[14], // Дизайнер
          Members[20], // Frontend
          Members[26]  // Backend
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'Создание мобильной игры',
    max_members_team: 5,
    possible_roles: Role,
    status: DistributionStatus[1], // completed
    auto_finish_date: '2026-01-30',
    auto_finish_time: '19:00',
    team_expiry_date: '2026-04-01',
    invite_link: 'invite-mobile-game-1',
    is_admin: true,
    // Нет members
    teams: [
      // team[0] отсутствует - начинаем с id: 301
      {
        id: 301,
        members: [
          Members[3],  // Тимлид
          Members[9],  // Аналитик
          Members[15], // Дизайнер
          Members[21], // Frontend
          Members[27]  // Backend
        ]
      },
      {
        id: 302,
        members: [
          Members[4],   // Тимлид
          Members[10],  // Аналитик
          Members[16],  // Дизайнер
          Members[22],  // Frontend
          Members[28]   // Backend
        ]
      }
    ]
  },

  // Вид 5: is_admin: true, status: 'end' (нет members, но есть teams, team[0] отсутствует) - 2 шт
  {
    id: 9,
    name: 'Разработка чат-бота',
    max_members_team: 5,
    possible_roles: Role,
    status: DistributionStatus[2], // end
    auto_finish_date: '2025-06-20',
    auto_finish_time: '12:00',
    team_expiry_date: '2025-11-15',
    invite_link: 'invite-chatbot-1',
    is_admin: true,
    // Нет members
    teams: [
      // team[0] отсутствует - начинаем с id: 401
      {
        id: 401,
        members: [
          Members[5],   // Тимлид
          Members[11],  // Аналитик
          Members[17],  // Дизайнер
          Members[23],  // Frontend
          Members[29]   // Backend
        ]
      },
      {
        id: 402,
        members: [
          Members[2],  // Тимлид
          Members[6],  // Аналитик
          Members[12], // Дизайнер
          Members[18], // Frontend
          Members[24]  // Backend
        ]
      },
      {
        id: 403,
        members: [
          Members[1],  // Тимлид
          Members[7],  // Аналитик
          Members[13], // Дизайнер
          Members[19], // Frontend
          Members[25]  // Backend
        ]
      }
    ]
  },
  {
    id: 10,
    name: 'Создание системы бронирования',
    max_members_team: 5,
    possible_roles: Role,
    status: DistributionStatus[2], // end
    auto_finish_date: '2025-06-10',
    auto_finish_time: '18:00',
    team_expiry_date: '2025-10-30',
    invite_link: 'invite-booking-system-1',
    is_admin: true,
    // Нет members
    teams: [
      // team[0] отсутствует - начинаем с id: 501
      {
        id: 501,
        members: [
          Members[2],  // Тимлид
          Members[8],  // Аналитик
          Members[14], // Дизайнер
          Members[20], // Frontend
          Members[26]  // Backend
        ]
      },
      {
        id: 502,
        members: [
          Members[3],  // Тимлид
          Members[9],  // Аналитик
          Members[15], // Дизайнер
          Members[21], // Frontend
          Members[27]  // Backend
        ]
      },
      {
        id: 503,
        members: [
          Members[4],   // Тимлид
          Members[10],  // Аналитик
          Members[16],  // Дизайнер
          Members[22],  // Frontend
          Members[28]   // Backend
        ]
      },
      {
        id: 504,
        members: [
          Members[5],   // Тимлид
          Members[11],  // Аналитик
          Members[17],  // Дизайнер
          Members[23],  // Frontend
          Members[29]   // Backend
        ]
      },
    ]
  }
];

export default { 
  User, 
  Competence,
  Distributions,
  Role, 
  Experience
};