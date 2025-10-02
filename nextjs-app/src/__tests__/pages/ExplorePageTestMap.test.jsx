import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import MapComponent from '@/components/Map';
import TemporaryDrawer from '@/components/Drawer';

// Mock the leaflet setup
jest.mock('../../lib/leafletSetup', () => ({}));

// Mock leaflet and react-leaflet
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  useMapEvents: jest.fn(),
  useMap: () => ({
    flyToBounds: jest.fn(),
  }),
  Polyline: () => <div data-testid="polyline" />,
}));

// Mock the Drawer component
jest.mock('@/components/Drawer', () => {
  return function MockDrawer() {
    return <div data-testid="temporary-drawer">Drawer</div>;
  };
});

// Mock the Alerts component
jest.mock('@/components/Alerts', () => {
  return function MockAlerts() {
    return <div data-testid="alerts">Alerts</div>;
  };
});

// Mock API hooks
const mockGetOSRMRoute = jest.fn();
const mockAskGemini = jest.fn();
const mockUseGetUserQuery = jest.fn();

jest.mock('@/services/osrm', () => ({
  useGetOSRMRouteMutation: () => [
    mockGetOSRMRoute,
    {
      data: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
      error: null,
    },
  ],
}));

jest.mock('@/services/Gemini', () => ({
  useRequestGeminiMutation: () => [
    mockAskGemini,
    {
      data: null,
      error: null,
      isLoading: false,
      isError: false,
      isSuccess: false,
    },
  ],
}));

jest.mock('@/services/Auth', () => ({
  useGetUserQuery: () => mockUseGetUserQuery(),
}));

// Create a mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      // Add your reducers here if needed
      api: (state = {}) => state,
    },
  });
};

describe('MapComponent', () => {
  let store;

  beforeEach(() => {
    store = createMockStore();
    mockUseGetUserQuery.mockReturnValue({
      data: { id: 'test-user-123' },
      error: null,
      isLoading: false,
    });
    jest.clearAllMocks();
  });

  const renderWithProvider = (component) => {
    return render(<Provider store={store}>{component}</Provider>);
  };

  test('Explore page renders 1 input field on the screen', () => {
    renderWithProvider(<MapComponent />);

    const inputFields = screen.getAllByRole('textbox');
    expect(inputFields).toHaveLength(1);
  });

  test('input field has correct label', () => {
    renderWithProvider(<MapComponent />);

    const input = screen.getByLabelText(/explore with gemini/i);
    expect(input).toBeInTheDocument();
  });

  test('renders submit button', () => {
    renderWithProvider(<MapComponent />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    expect(submitButton).toBeInTheDocument();
  });

  test('renders map container', () => {
    renderWithProvider(<MapComponent />);

    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
  });

  test('input value changes when user types', async () => {
    const user = userEvent.setup();
    renderWithProvider(<MapComponent />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Test query');

    expect(input).toHaveValue('Test query');
  });

  test('calls askGemini when submit button is clicked', async () => {
    const user = userEvent.setup();
    mockAskGemini.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue([
        {
          title: 'Test Location',
          description: 'Test Description',
          coordinates: [[0, 0]],
          startCoordinate: [0, 0],
        },
      ]),
    });

    renderWithProvider(<MapComponent />);

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(input, 'hiking trails');
    await user.click(submitButton);

    expect(mockAskGemini).toHaveBeenCalledWith({ value: 'hiking trails' });
  });

  test('submits form when Enter key is pressed', async () => {
    const user = userEvent.setup();
    mockAskGemini.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue([]),
    });

    renderWithProvider(<MapComponent />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test query{Enter}');

    expect(mockAskGemini).toHaveBeenCalledWith({ value: 'test query' });
  });

  test('clears input after submission', async () => {
    const user = userEvent.setup();
    mockAskGemini.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue([]),
    });

    renderWithProvider(<MapComponent />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'test query');
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(input).toHaveValue('');
    });
  });

  test('renders markers when markerData is available', async () => {
    const user = userEvent.setup();
    mockAskGemini.mockReturnValue({
      unwrap: jest.fn().mockResolvedValue([
        {
          title: 'Location 1',
          description: 'Description 1',
          coordinates: [[-45.0302, 168.6615]],
          startCoordinate: [-45.0302, 168.6615],
        },
        {
          title: 'Location 2',
          description: 'Description 2',
          coordinates: [[-45.0402, 168.6715]],
          startCoordinate: [-45.0402, 168.6715],
        },
      ]),
    });

    renderWithProvider(<MapComponent />);

    const input = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: /submit/i });

    await user.type(input, 'test');
    await user.click(submitButton);

    await waitFor(() => {
      const markers = screen.getAllByTestId('marker');
      expect(markers).toHaveLength(2);
    });
  });
});