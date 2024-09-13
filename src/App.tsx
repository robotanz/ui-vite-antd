import {HomeOutlined, LineChartOutlined, SettingFilled} from '@ant-design/icons'
import styled from '@emotion/styled'
import {
  Button,
  Checkbox,
  ColorPicker,
  ConfigProvider,
  DatePicker,
  InputNumber,
  Modal,
  Select,
  Space,
  Typography
} from 'antd'
import dayjs from 'dayjs'
import {setLightness} from 'polished'
import {useState} from 'react'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

const selectAfter = (
  <Select
    defaultValue="USD"
    style={{
      width: 60,
    }}
  >
    <Select.Option value="USD">$</Select.Option>
    <Select.Option value="EUR">€</Select.Option>
    <Select.Option value="GBP">£</Select.Option>
    <Select.Option value="CNY">¥</Select.Option>
  </Select>
)

const StyledButton = styled(Button)`
    color: red;
`

const BRAND_BLUE = '#154194'

function App() {
  const [checked, setChecked] = useState(true)
  const [color, setColor] = useState(BRAND_BLUE)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const selectedColor = setLightness(0.8, color)
  const activeColor = setLightness(0.9, color)

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: color,
          borderRadius: 3,

          // Alias Token
          colorBgContainer: 'white',
          fontSize: 14,

        },
        components: {
          Select: {
            optionActiveBg: activeColor,
            optionSelectedBg: selectedColor,
          },
        },
      }}
    >
    <div style={{ padding: '10px'}}>
      <Space direction="vertical">
        <Typography.Title>Ant Design UI Components</Typography.Title>
        <Space>
          <Button type="primary" size="small">Button 1</Button>
          <StyledButton type="default" size="small">Button 2</StyledButton>
          <InputNumber addonAfter={selectAfter} size="small" defaultValue={100} />
          <HomeOutlined />
          <SettingFilled />
          <ColorPicker value={color} onChange={e => setColor(e.toCssString())} size="small" showText />
        </Space>
        <Space>
          <InputNumber addonAfter={selectAfter} size="small" defaultValue={100} disabled={!checked} />
          <Checkbox checked={checked} disabled={false} onChange={e => setChecked(e.target.checked)}>
            Enabled
          </Checkbox>
          <DatePicker
            defaultValue={dayjs().tz('America/Chicago')}
            showTime
            size="small"
            format="YYYY-MM-DD HH:mm"
            onChange={(value, dateString) => {
              console.log('Selected Time: ', value);
              console.log('Formatted Selected Time: ', dateString);
            }}
            onOk={() => {}}
          />
        </Space>
        <Space>
          <Select
            defaultValue="well1"
            size="small"
            style={{ width: 120 }}
            onChange={() => {}}
            options={[
              { value: 'well1', label: 'Well #1' },
              { value: 'well2', label: 'Well #2' },
              { value: 'well3', label: 'Well #3' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
        </Space>
        <Space>
          <Button icon={<LineChartOutlined />} type="primary" size="small" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </Button>
          <Modal title="Basic Modal" open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
            <Space direction='vertical'>

            <Typography.Text>Modal contents...</Typography.Text>
            <DatePicker
              defaultValue={dayjs().tz('America/Chicago')}
              showTime
              size="small"
              format="YYYY-MM-DD HH:mm"
              onChange={(value, dateString) => {
                console.log('Selected Time: ', value);
                console.log('Formatted Selected Time: ', dateString);
              }}
              onOk={() => {}}
            />
            <ColorPicker value={color} onChange={e => setColor(e.toCssString())} size="small" showText />
            </Space>
          </Modal>
        </Space>
      </Space>
    </div>
    </ConfigProvider>
  )
}

export default App
