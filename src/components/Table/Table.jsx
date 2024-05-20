import React, { useEffect, useMemo, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getMasterList } from "../../redux/slices/MasterList/masterListSlice";
import Tooltip from "@mui/material/Tooltip";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import LoadingAnimation from "../Animations/LoadingAnimation";

// Function to generate field mapping dynamically
const generateFieldMapping = (data) => {
  if (!data || data.length === 0) return {};
  const firstItem = data[0].ratings;
  const fieldMapping = {};
  let index = 1;

  Object.keys(firstItem).forEach((key) => {
    fieldMapping[key] = `Q${index}`;
    index++;
  });

  return fieldMapping;
};

// Function to transform data using field mapping
const transformData = (data, fieldMapping) => {
  return data.map((item) => {
    const newItem = {};
    for (const [longName, shortName] of Object.entries(fieldMapping)) {
      newItem[shortName] = item.ratings[longName]?.toString() || ""; // Ensure all values are strings
    }
    newItem.evaluated_name = item.evaluated_name;
    newItem.overall_average_rating =
      item.overall_average_rating?.toString() || ""; // Ensure this value is also a string
    newItem.evaluated_id = item.evaluated_id;
    return newItem;
  });
};

// Function to filter out rows with undefined or null values
const filterDefinedData = (data) => {
  return data.filter((item) =>
    Object.values(item).every((value) => value !== undefined && value !== null)
  );
};

const Table = React.memo(() => {
  const dispatch = useDispatch();
  const [formType, setFormType] = useState("STUDENT EVALUATION OF TEACHING");

  // Selectors
  const masterlistData = useSelector((state) => state.masterlist.data.data);
  const masterlistStatus = useSelector((state) => state.masterlist.status);

  const handleFormType = (event) => setFormType(event.target.value);

  useEffect(() => {
    dispatch(getMasterList({ type: formType }));
  }, [dispatch, formType]);

  // Generate field mapping dynamically
  const fieldMapping = useMemo(
    () => generateFieldMapping(masterlistData),
    [masterlistData]
  );

  // Transform data using the generated field mapping
  const transformedData = useMemo(
    () => (masterlistData ? transformData(masterlistData, fieldMapping) : []),
    [masterlistData, fieldMapping]
  );

  // Filter out rows with undefined or null values
  const filteredData = useMemo(
    () => filterDefinedData(transformedData),
    [transformedData]
  );

  // Create columns dynamically
  const columns = useMemo(
    () => [
      {
        field: "evaluated_name",
        headerName: "Name",
        sortable: false,
        width: 150,
        editable: true,
        headerClassName: "sticky-header",
      },
      {
        field: "overall_average_rating",
        headerName: "Overall Rating",
        sortable: false,
        width: 150,
        editable: false,
      },
      ...Object.entries(fieldMapping).map(([longName, shortName]) => ({
        field: shortName,
        headerName: shortName,
        width: 70,
        sortable: false,
        editable: false,
        renderHeader: () => (
          <Tooltip title={longName}>
            <span>{shortName}</span>
          </Tooltip>
        ),
        renderCell: (params) => (
          <div
            style={{
              borderRight: "1px solid #ccc", // Add right border
              padding: "8px",
            }}
          >
            {params.value}
          </div>
        ),
      })),
    ],
    [fieldMapping]
  );

  // useCallback to memoize getRowId function
  const getRowId = useCallback((row) => row.evaluated_id, []);

  return (
    <div>
      <div className="flex flex-col justify-between md:flex-row mb-4 md:mb-0">
        <h1 className="my-2 font-bold  text-2xl">Master List</h1>
        <div className="w-full md:max-w-96">
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Form Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formType}
              size="small"
              label="Form Type"
              onChange={handleFormType}
            >
              <MenuItem value="STUDENT EVALUATION OF TEACHING">
                STUDENT EVALUATION OF TEACHING
              </MenuItem>
              <MenuItem value="VALUATION OF TEACHERS PERFORMANCE">
                EVALUATION OF TEACHERS PERFORMANCE
              </MenuItem>
              <MenuItem value="ADMINISTRATORS EVALUATION">
                ADMINISTRATORS EVALUATION
              </MenuItem>
              <MenuItem value="EVALUATION INSTRUMENT FOR NON-TEACHING">
                EVALUATION INSTRUMENT FOR NON-TEACHING
              </MenuItem>
              <MenuItem value="CLASSROOM OBSERVATION INSTRUMENT" disabled>
                CLASSROOM OBSERVATION INSTRUMENT
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="border-2 border-black"></div>
      <Box
        sx={{
          height: "400px",
          width: "100%",
          maxWidth: "100%",
          maxHeight: "600px",
        }}
      >
        {masterlistStatus === "loading" && <div className="flex absolute inset-0 justify-center items-center"><LoadingAnimation /></div>}
        {masterlistStatus === "success" && (
          <>
            {" "}
            <DataGrid
              rows={filteredData}
              columns={columns}
              getRowId={getRowId}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
              rowHeight={40}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
            />
          </>
        )}
      </Box>
    </div>
  );
});

export default Table;
