const Role = ['Тимлид', 'Аналитик', 'Дизайнер', 'Frontend-разработчик', 'Backend-разработчик'];

const DistributionStatus = ['active', 'completed', 'end'];

const Experience = ["Нет практического опыта", "До полугода", "От полугода до года", "Более одного года менее трёх лет", "Более трёх лет"];

const Competence = [
    {
        id: 1,
        role: Role[3],
        stack: "React, TypeSrcipt",
        experience: Experience[3],
    },
    {
        id: 2,
        role: Role[1],
        stack: "Составление отчета, работа в YouGile",
        experience: Experience[2],
    },
]  

const Members = [
    {
        id: 1,
        firstName: "Марина",
        middleName: "Александровна",
        lastName: "Попова",
        roles: [Role[3]],
        tg_link: "@tg_link"
    },
    {
        id: 2,
        firstName: "Марина",
        middleName: "Александровна",
        lastName: "Попова",
        roles: [Role[3]],
        tg_link: "@tg_link"
    },
    {
        id: 1,
        firstName: "Марина",
        middleName: "Александровна",
        lastName: "Попова",
        roles: [Role[3]],
        tg_link: "@tg_link"
    },
    {
        id: 1,
        firstName: "Марина",
        middleName: "Александровна",
        lastName: "Попова",
        roles: [Role[3]],
        tg_link: "@tg_link"
    },
    {
        id: 1,
        firstName: "Марина",
        middleName: "Александровна",
        lastName: "Попова",
        roles: [Role[3]],
        tg_link: "@tg_link"
    },
    {
        id: 1,
        firstName: "Марина",
        middleName: "Александровна",
        lastName: "Попова",
        roles: [Role[3]],
        tg_link: "@tg_link"
    },
    {
        id: 1,
        firstName: "Марина",
        middleName: "Александровна",
        lastName: "Попова",
        roles: [Role[3]],
        tg_link: "@tg_link"
    },
]  

const Teams = [
    {
        id: 1,
        firstName: "Марина",
        middleName: "Александровна",
        lastName: "Попова",
        roles: Role[3],
        tg_link: "@link"
    },
    {
        id: 2,
        role: Role[1],
        stack: "Составление отчета, работа в YouGile",
        experience: Experience[2],
    },
    {
        id: 3,
        role: Role[1],
        stack: "Составление отчета, работа в YouGile",
        experience: Experience[2],
    },
    {
        id: 4,
        role: Role[1],
        stack: "Составление отчета, работа в YouGile",
        experience: Experience[2],
    },
]  

const User = {
    firstName: "Марина",
    middleName: "Александровна",
    lastName: "Попова",
    username: "wunsha",
    tgLink: "wumsha",
    password: "123456789",
    competence: Competence
} 

const Distributions = [
    {
        id: 1,
        name: 'Разработка приложения"',
        max_members_team: 5,
        possible_roles: ['Тимлид', 'Аналитик', 'Дизайнер', 'Frontend-разработчик', 'Backend-разработчик'],
        status: DistributionStatus[0],
        auto_finish_date: '2026-06-01',
        auto_finish_time: '18:00',
        team_expiry_date: '2026-08-31',
        invite_link: 'invite-1',
        is_admin: false,
    },
    {
        id: 2,
        name: 'Разработка сайта',
        max_members_team: 5,
        possible_roles: ['Тимлид', 'Аналитик', 'Дизайнер', 'Frontend-разработчик', 'Backend-разработчик'],
        status: DistributionStatus[1],
        auto_finish_date: '2026-06-01',
        auto_finish_time: '18:00',
        team_expiry_date: '2026-08-31',
        invite_link: 'invite-1',
        is_admin: false,
        team: Teams[2]
    },
    {
        id: 3,
        name: 'Разработка ПО',
        max_members_team: 5,
        possible_roles: ['Тимлид', 'Аналитик', 'Дизайнер', 'Frontend-разработчик', 'Backend-разработчик'],
        status: DistributionStatus[0],
        auto_finish_date: '2026-06-01',
        auto_finish_time: '18:00',
        team_expiry_date: '2026-08-31',
        invite_link: 'invite-2',
        is_admin: true,
        memners: Members
    },
    {
        id: 4,
        name: 'Разработка приложения',
        max_members_team: 5,
        possible_roles: ['Тимлид', 'Аналитик', 'Дизайнер', 'Frontend-разработчик', 'Backend-разработчик'],
        status: DistributionStatus[1],
        auto_finish_date: '2026-06-01',
        auto_finish_time: '18:00',
        team_expiry_date: '2026-08-31',
        invite_link: 'invite-3',
        is_admin: false,
        teams: Teams
    },
    {
        id: 5,
        name: 'Разработка MVP',
        max_members_team: 5,
        possible_roles: ['Тимлид', 'Аналитик', 'Дизайнер', 'Frontend-разработчик', 'Backend-разработчик'],
        status: DistributionStatus[2],
        auto_finish_date: '2026-06-01',
        auto_finish_time: '18:00',
        team_expiry_date: '2026-08-31',
        invite_link: 'invite-4',
        is_admin: false,
        teams: Teams
    },
]

export default { User, Distributions };