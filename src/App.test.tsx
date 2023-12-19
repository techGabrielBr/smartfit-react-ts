import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from './App';

describe('App Component', () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  test('renders App component and initializes with empty data', async () => {
    const mockApiResponse = {
      locations: [],
    };
    mock.onGet('https://test-frontend-developer.s3.amazonaws.com/data/locations.json').reply(200, mockApiResponse);

    render(<App />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText("REABERTURA SMART FIT")).toBeInTheDocument();
    expect(screen.getByText("Nenhuma academia encontrada")).toBeInTheDocument();
  });

  test('updates list based on form morning filter', async () => {
    const mockApiResponse = {
      locations: [
        {
            "id": 10998878976097,
            "title": "Dom Severino",
            "content": "\n<p>Av. Dom Severino, 1733 &#8211; Fátima<br>Teresina, PI</p>\n",
            "opened": true,
            "mask": "required",
            "towel": "required",
            "fountain": "partial",
            "locker_room": "allowed",
            "schedules": [
              {
                "weekdays": "Seg. à Sex.",
                "hour": "06h às 22h"
              },
              {
                "weekdays": "Sáb.",
                "hour": "Fechada"
              },
              {
                "weekdays": "Dom.",
                "hour": "Fechada"
              }
            ]
          }
      ],
    };
    mock.onGet('https://test-frontend-developer.s3.amazonaws.com/data/locations.json').reply(200, mockApiResponse);

    render(<App />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.click(screen.getByText("Manhã"));
    fireEvent.click(screen.getByText("ENCONTRAR UNIDADE"));

    expect(screen.queryByText("Dom Severino")).toBeInTheDocument();
  });

  test('resets list and updates state', async () => {
    const mockApiResponse = {
      locations: [
        {
            "id": 10998878976097,
            "title": "Dom Severino",
            "content": "\n<p>Av. Dom Severino, 1733 &#8211; Fátima<br>Teresina, PI</p>\n",
            "opened": true,
            "mask": "required",
            "towel": "required",
            "fountain": "partial",
            "locker_room": "allowed",
            "schedules": [
              {
                "weekdays": "Seg. à Sex.",
                "hour": "06h às 22h"
              },
              {
                "weekdays": "Sáb.",
                "hour": "Fechada"
              },
              {
                "weekdays": "Dom.",
                "hour": "Fechada"
              }
            ]
          },
          {
            "id": 10998878976079,
            "title": "Presidente Prudente",
            "content": "\n<p>Rua Siqueira Campos, 1545 &#8211; Vila Roberto<br>Presidente Prudente, SP</p>\n",
            "opened": false,
            "mask": "required",
            "towel": "required",
            "fountain": "partial",
            "locker_room": "allowed",
            "schedules": [
              {
                "weekdays": "Seg. à Sex.",
                "hour": "Fechada"
              },
              {
                "weekdays": "Sáb.",
                "hour": "Fechada"
              },
              {
                "weekdays": "Dom.",
                "hour": "Fechada"
              }
            ]
          }
      ],
    };
    mock.onGet('https://test-frontend-developer.s3.amazonaws.com/data/locations.json').reply(200, mockApiResponse);

    render(<App />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.click(screen.getByText("Manhã"));
    fireEvent.click(screen.getByText("ENCONTRAR UNIDADE"));

    expect(screen.queryByText("Presidente Prudente")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("LIMPAR"));

    expect(screen.queryByText("Presidente Prudente")).toBeInTheDocument();
  });

  test('redirects to list', async () => {
    const mockApiResponse = {
      locations: [
        {
            "id": 10998878976097,
            "title": "Dom Severino",
            "content": "\n<p>Av. Dom Severino, 1733 &#8211; Fátima<br>Teresina, PI</p>\n",
            "opened": true,
            "mask": "required",
            "towel": "required",
            "fountain": "partial",
            "locker_room": "allowed",
            "schedules": [
              {
                "weekdays": "Seg. à Sex.",
                "hour": "06h às 22h"
              },
              {
                "weekdays": "Sáb.",
                "hour": "Fechada"
              },
              {
                "weekdays": "Dom.",
                "hour": "Fechada"
              }
            ]
          },
      ],
    };
    mock.onGet('https://test-frontend-developer.s3.amazonaws.com/data/locations.json').reply(200, mockApiResponse);

    render(<App />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    fireEvent.click(screen.getByText("Manhã"));
    fireEvent.click(screen.getByText("ENCONTRAR UNIDADE"));

    expect(window.location.href).toContain('#list-box');
  });
});
