import { Box, Flex, SimpleGrid, theme, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'

import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
})

const options = {
  chart: {
    foreColor: theme.colors.gray['500'],
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    gradient: {
      opacityFrom: 0.7,
      opacityTo: 0.3,
      shade: 'dark'
    },
    opacity: 0.3,
    type: 'gradient'
  },
  grid: {
    show: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    axisBorder: {
      color: theme.colors.gray['600']
    },
    axisTicks: {
      color: theme.colors.gray['600']
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z',
    ],
    type: 'datetime'
  }
}

const series = [
  {
    data: [31, 120, 10, 28, 51, 18, 109],
    name: 'series1'
  }
]

const Dashboard = () => {
  return (
    <Flex
      direction="column"
      height="100vh"
    >
      <Header />

      <Flex
        marginX="auto"
        marginY="6"
        maxWidth={1480}
        paddingX="6"
        width="100%"
      >
        <Sidebar />

        <SimpleGrid
          align="flex-start"
          flex="1"
          gap="4"
          minChildWidth="320px"
        >
          <Box
            backgroundColor="gray.800"
            borderRadius="8"
            padding={["6", "8"]}
            paddingBottom="4"
          >
            <Text fontSize="lg" marginBottom="4">
              Inscritos da semana
            </Text>

            <Chart height={160} options={options} series={series} type="area" />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  )
}

export default Dashboard