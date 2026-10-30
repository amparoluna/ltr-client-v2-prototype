import type { Meta, StoryObj } from '@storybook/react-vite';
import * as React from 'react';
import { useForm as useTanStackForm } from '@tanstack/react-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm as useReactHookForm } from 'react-hook-form';
import { Accessibility, HeartHandshake, House, type LucideIcon } from 'lucide-react';
import { z } from 'zod';

import { Input } from '../src/components/input';
import { Field } from '../src/components/field';
import { Textarea } from '../src/components/textarea';
import { Select, SelectItem } from '../src/components/select';
import { Combobox, ComboboxItem } from '../src/components/combobox';
import { DatePicker } from '../src/components/date-picker';
import { Checkbox } from '../src/components/checkbox';
import { Button } from '../src/components/button';
import { ChoiceCard, ChoiceCardGroup } from '../src/components/choice-card';

/* -------------------------------------------------------------------------- */
/*  Shared Zod schema used by both examples                                   */
/* -------------------------------------------------------------------------- */

const petTypeSchema = z.enum(['household', 'assistance-animal', 'support-animal']);

const addUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  moveInDate: z.date().optional(),
  petType: petTypeSchema,
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  sector: z.string().min(1, 'Please select a sector'),
  pmSystems: z.array(z.string()).min(1, 'Select at least one PM system'),
  sendInvite: z.boolean(),
});

type AddUserValues = z.infer<typeof addUserSchema>;
type PetType = z.infer<typeof petTypeSchema>;

/* -------------------------------------------------------------------------- */
/*  Options (shared)                                                          */
/* -------------------------------------------------------------------------- */

const sectors = [
  { value: 'leasing', label: 'Leasing' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'accounting', label: 'Accounting' },
  { value: 'operations', label: 'Operations' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'resident-services', label: 'Resident Services' },
];

const pmSystems = [
  { value: 'rentvine', label: 'Rentvine' },
  { value: 'entrata', label: 'Entrata' },
  { value: 'graystar', label: 'Graystar' },
  { value: 'appfolio', label: 'AppFolio' },
  { value: 'yardi', label: 'Yardi' },
  { value: 'buildium', label: 'Buildium' },
  { value: 'realpage', label: 'RealPage' },
];

const pmSystemLabels = Object.fromEntries(pmSystems.map((s) => [s.value, s.label]));

const petTypes = [
  {
    value: 'household',
    label: 'Household',
    description: 'A companion animal.',
    icon: House,
    recommended: true,
  },
  {
    value: 'assistance-animal',
    label: 'Assistance Animal',
    description: 'An animal trained to perform disability-related tasks.',
    icon: Accessibility,
    recommended: false,
  },
  {
    value: 'support-animal',
    label: 'Support Animal',
    description: 'An animal that provides emotional support.',
    icon: HeartHandshake,
    recommended: false,
  },
] as const satisfies ReadonlyArray<{
  value: PetType;
  label: string;
  description: string;
  icon: LucideIcon;
  recommended: boolean;
}>;

/* -------------------------------------------------------------------------- */
/*  Meta                                                                      */
/* -------------------------------------------------------------------------- */

const meta: Meta = {
  title: 'Getting Started/Form Examples',
};

export default meta;

/* -------------------------------------------------------------------------- */
/*  Story 1 — TanStack Form + Zod                                            */
/* -------------------------------------------------------------------------- */

/**
 * Helper to extract a displayable error string from a TanStack Form field.
 * TanStack Form stores errors as an array of ZodError-like objects or strings.
 */
function getFieldError(field: any) {
  if (!field.state.meta.isTouched || field.state.meta.isValid) return undefined;
  const messages = field.state.meta.errors.map((error: unknown) => {
    if (typeof error === 'string') return error;
    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof error.message === 'string'
    ) {
      return error.message;
    }
    return String(error);
  });
  return [...new Set(messages)].join(', ');
}

function TanStackFormDemo() {
  const form = useTanStackForm({
    defaultValues: {
      name: '',
      email: '',
      moveInDate: undefined as Date | undefined,
      petType: 'household' as PetType,
      bio: '',
      sector: '',
      pmSystems: [] as string[],
      sendInvite: true as boolean,
    },
    onSubmit: async ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  });

  return (
    <form
      className="flex flex-col gap-6 max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <h2 className="text-xl font-semibold">Add User to PM System — TanStack Form + Zod</h2>

      {/* ---- Name ---- */}
      <form.Field
        name="name"
        validators={{
          onBlur: z.string().min(2, 'Name must be at least 2 characters'),
          onSubmit: z.string().min(2, 'Name must be at least 2 characters'),
        }}
      >
        {(field) => (
          <Field label="Name" error={getFieldError(field)}>
            <Input
              placeholder="Jane Doe"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          </Field>
        )}
      </form.Field>

      {/* ---- Email ---- */}
      <form.Field
        name="email"
        validators={{
          onBlur: z.string().email('Please enter a valid email address'),
          onSubmit: z.string().email('Please enter a valid email address'),
        }}
      >
        {(field) => (
          <Field label="Email" error={getFieldError(field)}>
            <Input
              placeholder="jane@example.com"
              type="email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
          </Field>
        )}
      </form.Field>

      {/* ---- Move-in date ---- */}
      <form.Field
        name="moveInDate"
        validators={{
          onBlur: z.date().optional(),
          onSubmit: z.date().optional(),
        }}
      >
        {(field) => (
          <DatePicker
            label="Move-in date"
            optional
            placeholder="Pick a date"
            dateFormat="MM/dd/yyyy"
            value={field.state.value}
            onChange={(value) => field.handleChange(value)}
            onOpenChange={(open) => {
              if (!open) field.handleBlur();
            }}
            error={getFieldError(field)}
          />
        )}
      </form.Field>

      {/* ---- Pet type (exclusive ChoiceCard selection) ---- */}
      <form.Field
        name="petType"
        validators={{
          onSubmit: petTypeSchema,
        }}
      >
        {(field) => (
          <ChoiceCardGroup
            label="Pet type"
            selectionMode="single"
            name="petType"
            value={field.state.value}
            onValueChange={(value) => {
              field.handleChange(value);
              field.handleBlur();
            }}
            error={getFieldError(field)}
          >
            {petTypes.map((option) => {
              const Icon = option.icon;

              return (
                <ChoiceCard
                  key={option.value}
                  title={option.label}
                  description={option.description}
                  value={option.value}
                  icon={<Icon aria-hidden="true" />}
                  badge={option.recommended ? undefined : false}
                />
              );
            })}
          </ChoiceCardGroup>
        )}
      </form.Field>

      {/* ---- Bio ---- */}
      <form.Field
        name="bio"
        validators={{
          onBlur: z.string().min(10, 'Bio must be at least 10 characters'),
          onSubmit: z.string().min(10, 'Bio must be at least 10 characters'),
        }}
      >
        {(field) => (
          <Textarea
            label="Bio"
            placeholder="e.g. I manage leasing operations for the East region"
            description="Describe what you do in the company."
            maxLength={200}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            error={getFieldError(field)}
          />
        )}
      </form.Field>

      {/* ---- Sector ---- */}
      <form.Field
        name="sector"
        validators={{
          onBlur: z.string().min(1, 'Please select a sector'),
          onSubmit: z.string().min(1, 'Please select a sector'),
        }}
      >
        {(field) => (
          <Select
            label="Sector"
            placeholder="Select a sector"
            value={field.state.value}
            onValueChange={(val) => {
              field.handleChange(val as string);
              field.handleBlur();
            }}
            error={getFieldError(field)}
          >
            {sectors.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </Select>
        )}
      </form.Field>

      {/* ---- PM Systems (multi-select Combobox with search + tags) ---- */}
      <form.Field
        name="pmSystems"
        validators={{
          onSubmit: z.array(z.string()).min(1, 'Select at least one PM system'),
        }}
      >
        {(field) => (
          <Combobox
            label="PM System"
            multiple
            placeholder="Search PM systems..."
            description="Systems this user will have access to."
            tagLabels={pmSystemLabels}
            value={field.state.value}
            onValueChange={(val) => {
              field.handleChange(val as string[]);
              field.handleBlur();
            }}
            error={getFieldError(field)}
          >
            {pmSystems.map((s) => (
              <ComboboxItem key={s.value} value={s.value}>
                {s.label}
              </ComboboxItem>
            ))}
          </Combobox>
        )}
      </form.Field>

      {/* ---- Send invitation email ---- */}
      <form.Field name="sendInvite">
        {(field) => (
          <Checkbox
            label="Send invitation email"
            checked={field.state.value}
            onCheckedChange={(checked) => {
              field.handleChange(checked);
              field.handleBlur();
            }}
          />
        )}
      </form.Field>

      {/* ---- Submit ---- */}
      <Button type="submit" color="primary" shade="dark">
        Add user
      </Button>
    </form>
  );
}

export const TanStackFormExample: StoryObj = {
  render: () => <TanStackFormDemo />,
};

/* -------------------------------------------------------------------------- */
/*  Story 2 — React Hook Form + Zod                                          */
/* -------------------------------------------------------------------------- */

function ReactHookFormDemo() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useReactHookForm<AddUserValues>({
    resolver: zodResolver(addUserSchema),
    defaultValues: {
      name: '',
      email: '',
      moveInDate: undefined,
      petType: 'household',
      bio: '',
      sector: '',
      pmSystems: [],
      sendInvite: true,
    },
    mode: 'onBlur', // validate on blur + submit
  });

  const onSubmit = (data: AddUserValues) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form className="flex flex-col gap-6 max-w-md" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold">Add User to PM System — React Hook Form + Zod</h2>

      {/* ---- Name (register) ---- */}
      <Field label="Name" error={errors.name?.message}>
        <Input placeholder="Jane Doe" {...register('name')} />
      </Field>

      {/* ---- Email (register) ---- */}
      <Field label="Email" error={errors.email?.message}>
        <Input placeholder="jane@example.com" type="email" {...register('email')} />
      </Field>

      {/* ---- Move-in date (Controller — DatePicker uses Date | undefined) ---- */}
      <Controller
        name="moveInDate"
        control={control}
        render={({ field, fieldState }) => (
          <DatePicker
            label="Move-in date"
            optional
            placeholder="Pick a date"
            dateFormat="MM/dd/yyyy"
            value={field.value}
            onChange={field.onChange}
            onOpenChange={(open) => {
              if (!open) field.onBlur();
            }}
            error={fieldState.error?.message}
          />
        )}
      />

      {/* ---- Pet type (Controller — exclusive ChoiceCard selection) ---- */}
      <Controller
        name="petType"
        control={control}
        render={({ field, fieldState }) => (
          <ChoiceCardGroup
            label="Pet type"
            selectionMode="single"
            name={field.name}
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              field.onBlur();
            }}
            error={fieldState.error?.message}
          >
            {petTypes.map((option) => {
              const Icon = option.icon;

              return (
                <ChoiceCard
                  key={option.value}
                  title={option.label}
                  description={option.description}
                  value={option.value}
                  icon={<Icon aria-hidden="true" />}
                  badge={option.recommended ? undefined : false}
                />
              );
            })}
          </ChoiceCardGroup>
        )}
      />

      {/* ---- Bio (register) ---- */}
      <Textarea
        label="Bio"
        placeholder="e.g. I manage leasing operations for the East region"
        description="Describe what you do in the company."
        maxLength={200}
        error={errors.bio?.message}
        {...register('bio')}
      />

      {/* ---- Sector (Controller — Select is not a native input) ---- */}
      <Controller
        name="sector"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            label="Sector"
            placeholder="Select a sector"
            value={field.value}
            onValueChange={(val) => {
              field.onChange(val);
              field.onBlur();
            }}
            error={fieldState.error?.message}
          >
            {sectors.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      {/* ---- PM Systems (Controller — multi-select Combobox with tags) ---- */}
      <Controller
        name="pmSystems"
        control={control}
        render={({ field, fieldState }) => (
          <Combobox
            label="PM System"
            multiple
            placeholder="Search PM systems..."
            description="Systems this user will have access to."
            tagLabels={pmSystemLabels}
            value={field.value}
            onValueChange={(val) => {
              field.onChange(val);
              field.onBlur();
            }}
            error={fieldState.error?.message}
          >
            {pmSystems.map((s) => (
              <ComboboxItem key={s.value} value={s.value}>
                {s.label}
              </ComboboxItem>
            ))}
          </Combobox>
        )}
      />

      {/* ---- Send invitation email (Controller — Checkbox uses onCheckedChange) ---- */}
      <Controller
        name="sendInvite"
        control={control}
        render={({ field }) => (
          <Checkbox
            label="Send invitation email"
            checked={field.value}
            onCheckedChange={(checked) => {
              field.onChange(checked);
              field.onBlur();
            }}
          />
        )}
      />

      {/* ---- Submit ---- */}
      <Button type="submit" color="primary" shade="dark">
        Add user
      </Button>
    </form>
  );
}

export const ReactHookFormExample: StoryObj = {
  render: () => <ReactHookFormDemo />,
};
