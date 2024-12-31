import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/Auth/auth";
import { organizationApi } from "../services/Auth/organization";
import { teamsApi } from "../services/teams/teamsApi";
import { membersApi } from "../services/members/memberApi";
import { consentFormApi } from "../services/consentsForms/consentForm";
import { dashboardConsentApi } from "../services/dashboard/dashboardApi";
import { purposesAndFieldsApi } from "../services/purposes/purposesAndFields";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [organizationApi.reducerPath]: organizationApi.reducer,
    [teamsApi.reducerPath]: teamsApi.reducer,
    [membersApi.reducerPath]: membersApi.reducer,
    [consentFormApi.reducerPath]: consentFormApi.reducer,
    [dashboardConsentApi.reducerPath]: dashboardConsentApi.reducer,
    [purposesAndFieldsApi.reducerPath]: purposesAndFieldsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(organizationApi.middleware)
      .concat(membersApi.middleware)
      .concat(teamsApi.middleware)
      .concat(consentFormApi.middleware)
      .concat(dashboardConsentApi.middleware)
      .concat(purposesAndFieldsApi.middleware),
});
