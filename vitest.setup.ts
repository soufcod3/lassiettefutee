import "@testing-library/jest-dom";
import { vi } from "vitest";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

// Mock Next.js navigation
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({ push: vi.fn() })),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

// Mock Clerk authentication
vi.mock("@clerk/nextjs", () => ({
  useUser: vi.fn(() => ({ user: null })),
}));