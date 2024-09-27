export const salonData: Salon = {
    name: 'Mauro Chrisostimo',
    fee: 10,
    openDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
    hoursWorkedPerDay: 8,
    hoursWorkedInMonth: 160 * 3,
    expenses: [
        {
            _id: '1',
            name: 'Aluguel',
            type: 'fixed',
            category: 'Fixas',
            amount: 11800,
        },
        {
            _id: '2',
            name: 'Água',
            type: 'fixed',
            category: 'Variáveis',
            amount: 400,
        },
        {
            _id: '3',
            name: 'Resto',
            type: 'variable',
            category: 'Variáveis',
            amount: 20000,
        },
    ],
    services: [
        {
            _id: '1',
            name: 'Corte de Cabelo',
            cost: 130,
            commission: 50,
            attachedExpenses: [
                {
                    _id: '1',
                    name: 'Custo do Produto',
                    type: 'variable',
                    category: 'Serviços',
                    amount: 450,
                },
            ],
            duration: 1,
        },
        {
            _id: '2',
            name: 'Mechas de Cabelo',
            cost: 450,
            commission: 50,
            attachedExpenses: [
                {
                    _id: '1',
                    name: 'Custo do Produto',
                    type: 'variable',
                    category: 'Serviços',
                    amount: 2200,
                },
            ],
            duration: 4,
        },
    ],
}
