import { test, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

test('updates filter on hour change', () => {
  const total = 10;
  const setParentFilterMock = vi.fn();
  const resetListMock = vi.fn();
  const updateListMock = vi.fn();

  const mockFilter = {
    dirty: false,
    hour: '',
    onlyOpened: true,
  };

  render(
    <Form
      total={total}
      setParentFilter={setParentFilterMock}
      resetList={resetListMock}
      filter={mockFilter}
      updateList={updateListMock}
    />
  );

  fireEvent.click(screen.getByText("Manhã"));

  expect(setParentFilterMock).toHaveBeenCalledWith({
    dirty: true,
    hour: '0600/1200',
    onlyOpened: true
  });
});

test('updates filter on onlyOpened change', () => {
  const total = 10;
  const setParentFilterMock = vi.fn();
  const resetListMock = vi.fn();
  const updateListMock = vi.fn();

  const mockFilter = {
    dirty: false,
    hour: '',
    onlyOpened: true,
  };

  render(
    <Form
      total={total}
      setParentFilter={setParentFilterMock}
      resetList={resetListMock}
      filter={mockFilter}
      updateList={updateListMock}
    />
  );

  fireEvent.click(screen.getByLabelText("Exibir unidades fechadas"));

  expect(setParentFilterMock).toHaveBeenCalledWith({
    dirty: true,
    hour: '',
    onlyOpened: false,
  });
});
