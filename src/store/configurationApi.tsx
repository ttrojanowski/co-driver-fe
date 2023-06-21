import { createApi } from "@reduxjs/toolkit/query/react";
import { initialState, Configuration } from "./models/Configuration";

const baseQuery = () =>
  Promise.resolve({
    data: JSON.parse(
      localStorage.getItem("configuration") || JSON.stringify(initialState)
    ),
  });

export const localStorageApi = createApi({
  reducerPath: "localStorageApi",
  baseQuery,
  tagTypes: ["Configuration"],
  endpoints: (builder) => ({
    getConfiguration: builder.query<Configuration, void>({
      query: () => {
        console.log("getConfiguration");
        const config: Configuration = JSON.parse(
          localStorage.getItem("configuration") ?? "{}"
        );
        return config;
      },
      providesTags: ["Configuration"],
    }),
    setConfiguration: builder.mutation<void, Partial<Configuration>>({
      query: (newConfig) => {
        const existingConfig: Configuration = JSON.parse(
          localStorage.getItem("configuration") ?? JSON.stringify(initialState)
        );
        const updatedConfig = { ...existingConfig, ...newConfig };
        localStorage.setItem("configuration", JSON.stringify(updatedConfig));
      },
      invalidatesTags: ["Configuration"],
    }),
    resetConfiguration: builder.mutation<void, void>({
      query: () => {
        localStorage.setItem("configuration", JSON.stringify(initialState));
      },
      invalidatesTags: ["Configuration"],
    }),
  }),
});

export const { useGetConfigurationQuery, useSetConfigurationMutation, useResetConfigurationMutation } =
  localStorageApi;
