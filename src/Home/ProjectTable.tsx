import {
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Image,
} from "@fluentui/react-components"

import { useLocation } from "wouter"

interface ProjectCell {
  label: string
}

interface LastUpdatedCell {
  label: string
  timestamp: number
}
interface PreviewCell {
  src: string
}

interface Item {
  projectName: ProjectCell
  preview: PreviewCell
  lastUpdated: LastUpdatedCell
}

const items: Item[] = [
  {
    projectName: { label: "Sphere of mass destruction" },
    preview: { src: "https://placehold.co/300x200/" },
    lastUpdated: { label: "7h ago", timestamp: 1 },
  },
  {
    projectName: { label: "Sample mesh" },
    preview: { src: "https://placehold.co/300x200/" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
  },
  {
    projectName: { label: "Alpha ship" },
    preview: { src: "https://placehold.co/300x200/" },
    lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
  },
  {
    projectName: { label: "Hybroid" },
    preview: { src: "https://placehold.co/300x200/" },
    lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
  },
]

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: "projectName",
    compare: (a, b) => {
      return a.projectName.label.localeCompare(b.projectName.label)
    },
    renderHeaderCell: () => {
      return "Project"
    },
    renderCell: item => {
      return <TableCellLayout>{item.projectName.label}</TableCellLayout>
    },
  }),
  createTableColumn<Item>({
    columnId: "preview",
    renderHeaderCell: () => {
      return "Preview"
    },
    renderCell: item => {
      return (
        <TableCellLayout
          media={<Image fit="contain" src={item.preview.src} />}
        ></TableCellLayout>
      )
    },
  }),
  createTableColumn<Item>({
    columnId: "lastUpdated",
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp
    },
    renderHeaderCell: () => {
      return "Last updated"
    },
    renderCell: item => {
      return item.lastUpdated.label
    },
  }),
]

function ProjectTable() {
  const [_, setLocation] = useLocation()

  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      getRowId={item => item.projectName.label}
      focusMode="row_unstable"
      size="medium"
    >
      {/*selectionMode="multiselect"*/}
      {/* onSelectionChange={(e, data) => console.log(data)} */}
      <DataGridHeader>
        {/* selectionCell={{ "aria-label": "Select all rows" }}*/}
        <DataGridRow>
          {({ renderHeaderCell }) => (
            <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
          )}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          /* selectionCell={{ "aria-label": "Select row" }} */
          <DataGridRow<Item>
            key={rowId}
            onClick={() =>
              setLocation(`/editor/project${encodeURIComponent(rowId)}`)
            }
          >
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  )
}

export default ProjectTable
