import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react';
import List from './List';
import Gym from '../../models/Gym';

const mockDataComplete: Gym[] = [
    {
        "id": 10998878976081,
        "title": "Limeira",
        "content": "\n<p>Avenida Campinas, 50 &#8211; Vila Cidade Jardim<br>Limeira, SP</p>\n",
        "opened": true,
        "mask": "required",
        "towel": "required",
        "fountain": "partial",
        "locker_room": "partial",
        "schedules": [
            {
                "weekdays": "Seg. à Sex.",
                "hour": "06h às 10h"
            },
            {
                "weekdays": "Seg. à Sex.",
                "hour": "17h às 21h"
            },
            {
                "weekdays": "Sáb.",
                "hour": "09h às 14h"
            },
            {
                "weekdays": "Dom.",
                "hour": "Fechada"
            }
        ]
    }
];

const mockDataNotComplete: Gym[] = [
    {
        "id": 109988789769,
        "title": "Vila Carrão",
        "street": "Av. Guilherme Giorgi, 1460",
        "region": "Vila Carrão",
        "city_name": "São Paulo",
        "state_name": "São Paulo",
        "uf": "SP"
    }
]

test('renders List component with open status, content and schedule', () => {
  render(<List data={mockDataComplete} />);

  expect(screen.getByText("Aberto")).toBeInTheDocument();
  expect(screen.getByText(/Avenida Campinas/)).toBeInTheDocument();
  expect(screen.getByText("Sáb.")).toBeInTheDocument();
});

test('renders List component with closed status, no images and no schedule', () => {
  render(<List data={mockDataNotComplete} />);

  expect(screen.getByText("Fechado")).toBeInTheDocument();
  expect(screen.queryByAltText("Máscara")).not.toBeInTheDocument();
  expect(screen.queryByText("Sáb.")).not.toBeInTheDocument();
});
