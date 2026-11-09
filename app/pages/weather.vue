<template>
  <v-container fluid class="weather-dashboard fill-height pa-4 pa-md-6">
    <v-card flat class="weather-card pa-5 pa-md-8 text-white rounded-xl elevation-0 w-100 h-100 animate-fade-in">
      
      <v-row>
        <!-- LEFT COLUMN: Location, Search, Hero Weather & Today's Hourly Forecast -->
        <v-col cols="12" lg="6" class="d-flex flex-column justify-space-between">
          <div>
            <!-- Header Section with Search Bar -->
            <div class="mb-4 mb-md-6 d-flex flex-column flex-sm-row justify-space-between align-start align-sm-center ga-4 animate-slide-down">
              <div>
                <h1 class="text-h4 text-sm-h3 font-weight-bold mb-1 location-title">{{ weatherData.location }}</h1>
                <p class="text-subtitle-2 font-weight-regular opacity-80 mb-0">{{ weatherData.date }}</p>
              </div>

              <!-- Search Bar -->
              <v-text-field
                v-model="searchQuery"
                density="compact"
                variant="solo-filled"
                placeholder="Search city..."
                append-inner-icon="mdi-magnify"
                hide-details
                loading-text="Loading..."
                :loading="isLoading"
                class="search-input rounded-pill flex-grow-0"
                style="min-width: 200px;"
                @keyup.enter="handleSearch"
                @click:append-inner="handleSearch"
              ></v-text-field>
            </div>

            <!-- Hero Weather Stats -->
            <v-row class="align-center mb-6 ma-0 animate-scale-up">
              <!-- Temperature & Condition -->
              <v-col cols="12" sm="6" class="pa-0 pr-sm-4 mb-4 mb-sm-0">
                <div class="d-flex align-center justify-start ga-4">
                  <v-icon size="72" color="amber-lighten-2" class="flex-shrink-0 weather-icon-float">
                    {{ weatherData.icon }}
                  </v-icon>
                  <div>
                    <div class="main-temp font-weight-light line-height-1 temp-transition">
                      {{ weatherData.temp }}°C
                    </div>
                    <div class="text-subtitle-1 font-weight-medium mt-1 opacity-90">
                      {{ weatherData.condition }}
                    </div>
                  </div>
                </div>
              </v-col>

              <!-- Vertical Divider -->
              <div class="v-divider-custom d-none d-sm-block"></div>

              <!-- Metrics Grid -->
              <v-col cols="12" sm="5" class="pa-0 pl-sm-4">
                <v-row class="ma-0 text-center text-sm-left" dense>
                  <v-col cols="4" class="mb-3 metric-item">
                    <div class="text-subtitle-1 font-weight-bold">{{ weatherData.high }}°C</div>
                    <div class="text-caption opacity-70">High</div>
                  </v-col>

                  <v-col cols="4" class="mb-3 metric-item">
                    <div class="text-subtitle-1 font-weight-bold">{{ weatherData.wind }}</div>
                    <div class="text-caption opacity-70">Wind</div>
                  </v-col>

                  <v-col cols="4" class="mb-3 metric-item">
                    <div class="text-subtitle-1 font-weight-bold">{{ weatherData.humidity }}</div>
                    <div class="text-caption opacity-70">Humidity</div>
                  </v-col>

                  <v-col cols="4" class="metric-item">
                    <div class="text-subtitle-1 font-weight-bold">{{ weatherData.low }}°C</div>
                    <div class="text-caption opacity-70">Low</div>
                  </v-col>

                  <v-col cols="4" class="metric-item">
                    <div class="text-subtitle-1 font-weight-bold">{{ weatherData.rain }}</div>
                    <div class="text-caption opacity-70">Rain</div>
                  </v-col>

                  <v-col cols="4" class="metric-item">
                    <div class="text-subtitle-1 font-weight-bold">{{ weatherData.uvIndex }}</div>
                    <div class="text-caption opacity-70">UV Index</div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>

          <!-- Today's Weather Section -->
          <div class="mt-4">
            <h2 class="text-subtitle-1 font-weight-bold mb-3 opacity-90">Today's Hourly Weather</h2>

            <div class="d-flex ga-2 overflow-x-auto pb-2 scroll-container">
              <v-card
                v-for="(hour, index) in weatherData.hourlyForecast"
                :key="index"
                class="hourly-card text-center pa-3 rounded-lg flex-shrink-0 stagger-card"
                :style="{ animationDelay: `${index * 0.05}s` }"
                flat
                min-width="78"
              >
                <div class="text-caption font-weight-medium mb-1 opacity-90">{{ hour.time }}</div>
                <div class="my-1">
                  <v-icon size="28" color="white">{{ hour.icon }}</v-icon>
                </div>
                <div class="text-body-2 font-weight-bold">{{ hour.temp }}°C</div>
              </v-card>
            </div>
          </div>
        </v-col>

        <!-- RIGHT COLUMN: Next Days Forecast -->
        <v-col cols="12" lg="6" class="mt-4 mt-lg-0">
          <h2 class="text-subtitle-1 font-weight-bold mb-3 opacity-90">Daily Forecast</h2>

          <v-card class="daily-table-card rounded-lg overflow-hidden animate-slide-up" flat>
            <div
              v-for="(day, index) in weatherData.dailyForecast"
              :key="index"
              class="daily-row d-flex align-center justify-space-between px-4 py-3 stagger-row"
              :style="{ animationDelay: `${index * 0.08}s` }"
              :class="{ 'border-bottom': index !== weatherData.dailyForecast.length - 1 }"
            >
              <!-- Day & Date -->
              <div class="day-col">
                <div class="text-body-2 font-weight-bold">{{ day.day }}</div>
                <div class="text-caption opacity-70">{{ day.date }}</div>
              </div>

              <!-- Weather Icon -->
              <div class="icon-col text-center">
                <v-icon size="26" color="white">{{ day.icon }}</v-icon>
              </div>

              <!-- Low Temp -->
              <div class="text-center metric-col">
                <div class="text-body-2 font-weight-bold">{{ day.low }}°C</div>
                <div class="text-caption opacity-70">Low</div>
              </div>

              <!-- High Temp -->
              <div class="text-center metric-col">
                <div class="text-body-2 font-weight-bold">{{ day.high }}°C</div>
                <div class="text-caption opacity-70">High</div>
              </div>

              <!-- Wind -->
              <div class="text-center metric-col">
                <div class="text-body-2 font-weight-bold">{{ day.wind }}</div>
                <div class="text-caption opacity-70">Wind</div>
              </div>

              <!-- Rain -->
              <div class="text-center metric-col">
                <div class="text-body-2 font-weight-bold">{{ day.rain }}</div>
                <div class="text-caption opacity-70">Rain</div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const searchQuery = ref('')
const isLoading = ref(false)

const weatherData = ref({
  location: 'Loading...',
  date: '',
  temp: 0,
  condition: '',
  icon: 'mdi-weather-cloudy',
  high: 0,
  low: 0,
  wind: '',
  rain: '',
  humidity: '',
  uvIndex: '',
  hourlyForecast: [] as Array<{ time: string; icon: string; temp: number }>,
  dailyForecast: [] as Array<{ day: string; date: string; icon: string; low: number; high: number; wind: string; rain: string }>
})

const getWeatherIcon = (conditionText: string, isDay: number = 1) => {
  const text = conditionText.toLowerCase()
  if (text.includes('sunny') || text.includes('clear')) return isDay ? 'mdi-weather-sunny' : 'mdi-weather-night'
  if (text.includes('partly cloudy')) return isDay ? 'mdi-weather-partly-cloudy' : 'mdi-weather-night-partly-cloudy'
  if (text.includes('cloud') || text.includes('overcast')) return 'mdi-weather-cloudy'
  if (text.includes('thunder') || text.includes('storm')) return 'mdi-weather-lightning-rainy'
  if (text.includes('rain') || text.includes('drizzle')) return 'mdi-weather-rainy'
  if (text.includes('snow')) return 'mdi-weather-snowy'
  return 'mdi-weather-partly-cloudy'
}

const fetchWeatherData = async (city: string = 'San Fernando') => {
  if (!city.trim()) return
  isLoading.value = true

  try {
    const apiKey = '030eedc9d55d4595a9861128262610'
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5&aqi=yes&alerts=no`
    
    const response = await fetch(url)
    if (!response.ok) throw new Error('Location not found or API error')
    
    const data = await response.json()

    const current = data.current
    const location = data.location
    const forecastDay = data.forecast.forecastday[0]

    const dateObj = new Date(location.localtime)
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const formattedDate = dateObj.toLocaleDateString('en-US', options)

    const hourly = forecastDay.hour.map((h: any) => {
      const timeStr = h.time.split(' ')[1]
      return {
        time: timeStr,
        icon: getWeatherIcon(h.condition.text, h.is_day),
        temp: Math.round(h.temp_c)
      }
    })

    const daily = data.forecast.forecastday.map((dayData: any) => {
      const dObj = new Date(dayData.date)
      return {
        day: dObj.toLocaleDateString('en-US', { weekday: 'short' }),
        date: dObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        icon: getWeatherIcon(dayData.day.condition.text, 1),
        low: Math.round(dayData.day.mintemp_c),
        high: Math.round(dayData.day.maxtemp_c),
        wind: `${Math.round(dayData.day.maxwind_kph)} km/h`,
        rain: `${dayData.day.daily_chance_of_rain}%`
      }
    })

    weatherData.value = {
      location: `${location.name}, ${location.region || location.country}`,
      date: formattedDate,
      temp: Math.round(current.temp_c),
      condition: current.condition.text,
      icon: getWeatherIcon(current.condition.text, current.is_day),
      high: Math.round(forecastDay.day.maxtemp_c),
      low: Math.round(forecastDay.day.mintemp_c),
      wind: `${current.wind_kph} km/h`,
      rain: `${forecastDay.day.daily_chance_of_rain}%`,
      humidity: `${current.humidity}%`,
      uvIndex: `${current.uv}`,
      hourlyForecast: hourly,
      dailyForecast: daily
    }
  } catch (error) {
    console.error('Error fetching weather:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSearch = () => {
  if (searchQuery.value) {
    fetchWeatherData(searchQuery.value)
  }
}

onMounted(() => {
  fetchWeatherData('San Fernando')
})
</script>

<style scoped>
.weather-dashboard {
  background: linear-gradient(135deg, #1d3dbe 0%, #1754cd 50%, #0d5bc4 100%);
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;
  min-height: calc(100vh - 64px);
  box-sizing: border-box;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.weather-card {
  width: 100%;
  background: transparent !important;
}

/* Premium Animations & Keyframes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatIcon {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-6px) scale(1.03); }
}

.animate-fade-in {
  animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-down {
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}

.animate-scale-up {
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
}

.animate-slide-up {
  animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
}

.stagger-card {
  opacity: 0;
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.stagger-row {
  opacity: 0;
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.weather-icon-float {
  animation: floatIcon 4s ease-in-out infinite;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2));
}

.temp-transition {
  transition: all 0.4s ease;
}

.search-input :deep(.v-field) {
  background-color: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  transition: all 0.3s ease;
}

.search-input :deep(.v-field):hover {
  background-color: rgba(255, 255, 255, 0.22) !important;
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.search-input :deep(.v-field__input) {
  color: white !important;
}

.search-input :deep(.v-field__input::placeholder) {
  color: rgba(255, 255, 255, 0.7) !important;
}

.search-input :deep(.v-icon) {
  color: white !important;
  cursor: pointer;
}

.main-temp {
  font-size: 4.5rem;
  line-height: 1;
}

.line-height-1 {
  line-height: 1;
}

.opacity-90 { opacity: 0.9; }
.opacity-80 { opacity: 0.8; }
.opacity-70 { opacity: 0.7; }

.v-divider-custom {
  width: 1px;
  background-color: rgba(255, 255, 255, 0.25);
  align-self: stretch;
}

.hourly-card {
  background-color: rgba(255, 255, 255, 0.12) !important;
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.hourly-card:hover {
  transform: translateY(-4px) scale(1.02);
  background-color: rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.35);
}

.scroll-container {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scroll-container::-webkit-scrollbar {
  display: none;
}

.daily-table-card {
  background-color: rgba(0, 0, 0, 0.15) !important;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.daily-row {
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.daily-row:hover {
  background-color: rgba(255, 255, 255, 0.08);
  transform: scale(1.005);
}

.border-bottom {
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.day-col { min-width: 55px; }
.icon-col { min-width: 35px; }
.metric-col { min-width: 45px; }
</style>