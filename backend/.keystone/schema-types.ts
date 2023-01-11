type Scalars = {
  readonly ID: string;
  readonly Boolean: boolean;
  readonly String: string;
  readonly Int: number;
  readonly Float: number;
  readonly JSON: import('@keystone-next/types').JSONValue;
};

export type TrainingItemRelateToManyInput = {
  readonly create?: ReadonlyArray<TrainingItemCreateInput | null> | null;
  readonly connect?: ReadonlyArray<TrainingItemWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<TrainingItemWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type TeamRelateToOneInput = {
  readonly create?: TeamCreateInput | null;
  readonly connect?: TeamWhereUniqueInput | null;
  readonly disconnect?: TeamWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type EventsListItemRelateToManyInput = {
  readonly create?: ReadonlyArray<EventsListItemCreateInput | null> | null;
  readonly connect?: ReadonlyArray<EventsListItemWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<EventsListItemWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type RoleRelateToOneInput = {
  readonly create?: RoleCreateInput | null;
  readonly connect?: RoleWhereUniqueInput | null;
  readonly disconnect?: RoleWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type ExerciseRelateToManyInput = {
  readonly create?: ReadonlyArray<ExerciseCreateInput | null> | null;
  readonly connect?: ReadonlyArray<ExerciseWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<ExerciseWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type UserWhereInput = {
  readonly AND?: ReadonlyArray<UserWhereInput | null> | null;
  readonly OR?: ReadonlyArray<UserWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly email?: Scalars['String'] | null;
  readonly email_not?: Scalars['String'] | null;
  readonly email_contains?: Scalars['String'] | null;
  readonly email_not_contains?: Scalars['String'] | null;
  readonly email_starts_with?: Scalars['String'] | null;
  readonly email_not_starts_with?: Scalars['String'] | null;
  readonly email_ends_with?: Scalars['String'] | null;
  readonly email_not_ends_with?: Scalars['String'] | null;
  readonly email_i?: Scalars['String'] | null;
  readonly email_not_i?: Scalars['String'] | null;
  readonly email_contains_i?: Scalars['String'] | null;
  readonly email_not_contains_i?: Scalars['String'] | null;
  readonly email_starts_with_i?: Scalars['String'] | null;
  readonly email_not_starts_with_i?: Scalars['String'] | null;
  readonly email_ends_with_i?: Scalars['String'] | null;
  readonly email_not_ends_with_i?: Scalars['String'] | null;
  readonly email_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly email_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly password_is_set?: Scalars['Boolean'] | null;
  readonly training_every?: TrainingItemWhereInput | null;
  readonly training_some?: TrainingItemWhereInput | null;
  readonly training_none?: TrainingItemWhereInput | null;
  readonly team?: TeamWhereInput | null;
  readonly team_is_null?: Scalars['Boolean'] | null;
  readonly event_every?: EventsListItemWhereInput | null;
  readonly event_some?: EventsListItemWhereInput | null;
  readonly event_none?: EventsListItemWhereInput | null;
  readonly role?: RoleWhereInput | null;
  readonly role_is_null?: Scalars['Boolean'] | null;
  readonly exercise_every?: ExerciseWhereInput | null;
  readonly exercise_some?: ExerciseWhereInput | null;
  readonly exercise_none?: ExerciseWhereInput | null;
  readonly passwordResetToken_is_set?: Scalars['Boolean'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_not?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_lt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_lte?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_gt?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_gte?: Scalars['String'] | null;
  readonly passwordResetIssuedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetIssuedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_not?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_lt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_lte?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_gt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_gte?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly passwordResetRedeemedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthToken_is_set?: Scalars['Boolean'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_not?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_lt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_lte?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_gt?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_gte?: Scalars['String'] | null;
  readonly magicAuthIssuedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthIssuedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_not?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_lt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_lte?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_gt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_gte?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
  readonly magicAuthRedeemedAt_not_in?: ReadonlyArray<
    Scalars['String'] | null
  > | null;
};

export type UserWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortUsersBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'email_ASC'
  | 'email_DESC'
  | 'training_ASC'
  | 'training_DESC'
  | 'team_ASC'
  | 'team_DESC'
  | 'event_ASC'
  | 'event_DESC'
  | 'role_ASC'
  | 'role_DESC'
  | 'exercise_ASC'
  | 'exercise_DESC'
  | 'passwordResetIssuedAt_ASC'
  | 'passwordResetIssuedAt_DESC'
  | 'passwordResetRedeemedAt_ASC'
  | 'passwordResetRedeemedAt_DESC'
  | 'magicAuthIssuedAt_ASC'
  | 'magicAuthIssuedAt_DESC'
  | 'magicAuthRedeemedAt_ASC'
  | 'magicAuthRedeemedAt_DESC';

export type UserUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
  readonly training?: TrainingItemRelateToManyInput | null;
  readonly team?: TeamRelateToOneInput | null;
  readonly event?: EventsListItemRelateToManyInput | null;
  readonly role?: RoleRelateToOneInput | null;
  readonly exercise?: ExerciseRelateToManyInput | null;
  readonly passwordResetToken?: Scalars['String'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthToken?: Scalars['String'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
};

export type UsersUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: UserUpdateInput | null;
};

export type UserCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
  readonly training?: TrainingItemRelateToManyInput | null;
  readonly team?: TeamRelateToOneInput | null;
  readonly event?: EventsListItemRelateToManyInput | null;
  readonly role?: RoleRelateToOneInput | null;
  readonly exercise?: ExerciseRelateToManyInput | null;
  readonly passwordResetToken?: Scalars['String'] | null;
  readonly passwordResetIssuedAt?: Scalars['String'] | null;
  readonly passwordResetRedeemedAt?: Scalars['String'] | null;
  readonly magicAuthToken?: Scalars['String'] | null;
  readonly magicAuthIssuedAt?: Scalars['String'] | null;
  readonly magicAuthRedeemedAt?: Scalars['String'] | null;
};

export type UsersCreateInput = {
  readonly data?: UserCreateInput | null;
};

export type ExerciseImageRelateToOneInput = {
  readonly create?: ExerciseImageCreateInput | null;
  readonly connect?: ExerciseImageWhereUniqueInput | null;
  readonly disconnect?: ExerciseImageWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type UserRelateToOneInput = {
  readonly create?: UserCreateInput | null;
  readonly connect?: UserWhereUniqueInput | null;
  readonly disconnect?: UserWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type ExerciseWhereInput = {
  readonly AND?: ReadonlyArray<ExerciseWhereInput | null> | null;
  readonly OR?: ReadonlyArray<ExerciseWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description?: Scalars['String'] | null;
  readonly description_not?: Scalars['String'] | null;
  readonly description_contains?: Scalars['String'] | null;
  readonly description_not_contains?: Scalars['String'] | null;
  readonly description_starts_with?: Scalars['String'] | null;
  readonly description_not_starts_with?: Scalars['String'] | null;
  readonly description_ends_with?: Scalars['String'] | null;
  readonly description_not_ends_with?: Scalars['String'] | null;
  readonly description_i?: Scalars['String'] | null;
  readonly description_not_i?: Scalars['String'] | null;
  readonly description_contains_i?: Scalars['String'] | null;
  readonly description_not_contains_i?: Scalars['String'] | null;
  readonly description_starts_with_i?: Scalars['String'] | null;
  readonly description_not_starts_with_i?: Scalars['String'] | null;
  readonly description_ends_with_i?: Scalars['String'] | null;
  readonly description_not_ends_with_i?: Scalars['String'] | null;
  readonly description_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly photo?: ExerciseImageWhereInput | null;
  readonly photo_is_null?: Scalars['Boolean'] | null;
  readonly position?: Scalars['String'] | null;
  readonly position_not?: Scalars['String'] | null;
  readonly position_contains?: Scalars['String'] | null;
  readonly position_not_contains?: Scalars['String'] | null;
  readonly position_starts_with?: Scalars['String'] | null;
  readonly position_not_starts_with?: Scalars['String'] | null;
  readonly position_ends_with?: Scalars['String'] | null;
  readonly position_not_ends_with?: Scalars['String'] | null;
  readonly position_i?: Scalars['String'] | null;
  readonly position_not_i?: Scalars['String'] | null;
  readonly position_contains_i?: Scalars['String'] | null;
  readonly position_not_contains_i?: Scalars['String'] | null;
  readonly position_starts_with_i?: Scalars['String'] | null;
  readonly position_not_starts_with_i?: Scalars['String'] | null;
  readonly position_ends_with_i?: Scalars['String'] | null;
  readonly position_not_ends_with_i?: Scalars['String'] | null;
  readonly position_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly position_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly user?: UserWhereInput | null;
  readonly user_is_null?: Scalars['Boolean'] | null;
};

export type ExerciseWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortExercisesBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'photo_ASC'
  | 'photo_DESC'
  | 'position_ASC'
  | 'position_DESC'
  | 'user_ASC'
  | 'user_DESC';

export type ExerciseUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly description?: Scalars['String'] | null;
  readonly photo?: ExerciseImageRelateToOneInput | null;
  readonly position?: Scalars['String'] | null;
  readonly user?: UserRelateToOneInput | null;
};

export type ExercisesUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: ExerciseUpdateInput | null;
};

export type ExerciseCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly description?: Scalars['String'] | null;
  readonly photo?: ExerciseImageRelateToOneInput | null;
  readonly position?: Scalars['String'] | null;
  readonly user?: UserRelateToOneInput | null;
};

export type ExercisesCreateInput = {
  readonly data?: ExerciseCreateInput | null;
};

export type CloudinaryImageFormat = {
  readonly prettyName?: Scalars['String'] | null;
  readonly width?: Scalars['String'] | null;
  readonly height?: Scalars['String'] | null;
  readonly crop?: Scalars['String'] | null;
  readonly aspect_ratio?: Scalars['String'] | null;
  readonly gravity?: Scalars['String'] | null;
  readonly zoom?: Scalars['String'] | null;
  readonly x?: Scalars['String'] | null;
  readonly y?: Scalars['String'] | null;
  readonly format?: Scalars['String'] | null;
  readonly fetch_format?: Scalars['String'] | null;
  readonly quality?: Scalars['String'] | null;
  readonly radius?: Scalars['String'] | null;
  readonly angle?: Scalars['String'] | null;
  readonly effect?: Scalars['String'] | null;
  readonly opacity?: Scalars['String'] | null;
  readonly border?: Scalars['String'] | null;
  readonly background?: Scalars['String'] | null;
  readonly overlay?: Scalars['String'] | null;
  readonly underlay?: Scalars['String'] | null;
  readonly default_image?: Scalars['String'] | null;
  readonly delay?: Scalars['String'] | null;
  readonly color?: Scalars['String'] | null;
  readonly color_space?: Scalars['String'] | null;
  readonly dpr?: Scalars['String'] | null;
  readonly page?: Scalars['String'] | null;
  readonly density?: Scalars['String'] | null;
  readonly flags?: Scalars['String'] | null;
  readonly transformation?: Scalars['String'] | null;
};

export type ExerciseRelateToOneInput = {
  readonly create?: ExerciseCreateInput | null;
  readonly connect?: ExerciseWhereUniqueInput | null;
  readonly disconnect?: ExerciseWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type ExerciseImageWhereInput = {
  readonly AND?: ReadonlyArray<ExerciseImageWhereInput | null> | null;
  readonly OR?: ReadonlyArray<ExerciseImageWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly image?: Scalars['String'] | null;
  readonly image_not?: Scalars['String'] | null;
  readonly image_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly image_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly altText?: Scalars['String'] | null;
  readonly altText_not?: Scalars['String'] | null;
  readonly altText_contains?: Scalars['String'] | null;
  readonly altText_not_contains?: Scalars['String'] | null;
  readonly altText_starts_with?: Scalars['String'] | null;
  readonly altText_not_starts_with?: Scalars['String'] | null;
  readonly altText_ends_with?: Scalars['String'] | null;
  readonly altText_not_ends_with?: Scalars['String'] | null;
  readonly altText_i?: Scalars['String'] | null;
  readonly altText_not_i?: Scalars['String'] | null;
  readonly altText_contains_i?: Scalars['String'] | null;
  readonly altText_not_contains_i?: Scalars['String'] | null;
  readonly altText_starts_with_i?: Scalars['String'] | null;
  readonly altText_not_starts_with_i?: Scalars['String'] | null;
  readonly altText_ends_with_i?: Scalars['String'] | null;
  readonly altText_not_ends_with_i?: Scalars['String'] | null;
  readonly altText_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly altText_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly exercise?: ExerciseWhereInput | null;
  readonly exercise_is_null?: Scalars['Boolean'] | null;
};

export type ExerciseImageWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortExerciseImagesBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'altText_ASC'
  | 'altText_DESC'
  | 'exercise_ASC'
  | 'exercise_DESC';

export type ExerciseImageUpdateInput = {
  readonly image?: any | null;
  readonly altText?: Scalars['String'] | null;
  readonly exercise?: ExerciseRelateToOneInput | null;
};

export type ExerciseImagesUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: ExerciseImageUpdateInput | null;
};

export type ExerciseImageCreateInput = {
  readonly image?: any | null;
  readonly altText?: Scalars['String'] | null;
  readonly exercise?: ExerciseRelateToOneInput | null;
};

export type ExerciseImagesCreateInput = {
  readonly data?: ExerciseImageCreateInput | null;
};

export type PlayerImageRelateToOneInput = {
  readonly create?: PlayerImageCreateInput | null;
  readonly connect?: PlayerImageWhereUniqueInput | null;
  readonly disconnect?: PlayerImageWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type PlayerWhereInput = {
  readonly AND?: ReadonlyArray<PlayerWhereInput | null> | null;
  readonly OR?: ReadonlyArray<PlayerWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly number?: Scalars['String'] | null;
  readonly number_not?: Scalars['String'] | null;
  readonly number_contains?: Scalars['String'] | null;
  readonly number_not_contains?: Scalars['String'] | null;
  readonly number_starts_with?: Scalars['String'] | null;
  readonly number_not_starts_with?: Scalars['String'] | null;
  readonly number_ends_with?: Scalars['String'] | null;
  readonly number_not_ends_with?: Scalars['String'] | null;
  readonly number_i?: Scalars['String'] | null;
  readonly number_not_i?: Scalars['String'] | null;
  readonly number_contains_i?: Scalars['String'] | null;
  readonly number_not_contains_i?: Scalars['String'] | null;
  readonly number_starts_with_i?: Scalars['String'] | null;
  readonly number_not_starts_with_i?: Scalars['String'] | null;
  readonly number_ends_with_i?: Scalars['String'] | null;
  readonly number_not_ends_with_i?: Scalars['String'] | null;
  readonly number_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly number_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description?: Scalars['String'] | null;
  readonly description_not?: Scalars['String'] | null;
  readonly description_contains?: Scalars['String'] | null;
  readonly description_not_contains?: Scalars['String'] | null;
  readonly description_starts_with?: Scalars['String'] | null;
  readonly description_not_starts_with?: Scalars['String'] | null;
  readonly description_ends_with?: Scalars['String'] | null;
  readonly description_not_ends_with?: Scalars['String'] | null;
  readonly description_i?: Scalars['String'] | null;
  readonly description_not_i?: Scalars['String'] | null;
  readonly description_contains_i?: Scalars['String'] | null;
  readonly description_not_contains_i?: Scalars['String'] | null;
  readonly description_starts_with_i?: Scalars['String'] | null;
  readonly description_not_starts_with_i?: Scalars['String'] | null;
  readonly description_ends_with_i?: Scalars['String'] | null;
  readonly description_not_ends_with_i?: Scalars['String'] | null;
  readonly description_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly description_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly strengths?: Scalars['String'] | null;
  readonly strengths_not?: Scalars['String'] | null;
  readonly strengths_contains?: Scalars['String'] | null;
  readonly strengths_not_contains?: Scalars['String'] | null;
  readonly strengths_starts_with?: Scalars['String'] | null;
  readonly strengths_not_starts_with?: Scalars['String'] | null;
  readonly strengths_ends_with?: Scalars['String'] | null;
  readonly strengths_not_ends_with?: Scalars['String'] | null;
  readonly strengths_i?: Scalars['String'] | null;
  readonly strengths_not_i?: Scalars['String'] | null;
  readonly strengths_contains_i?: Scalars['String'] | null;
  readonly strengths_not_contains_i?: Scalars['String'] | null;
  readonly strengths_starts_with_i?: Scalars['String'] | null;
  readonly strengths_not_starts_with_i?: Scalars['String'] | null;
  readonly strengths_ends_with_i?: Scalars['String'] | null;
  readonly strengths_not_ends_with_i?: Scalars['String'] | null;
  readonly strengths_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly strengths_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly weaknesses?: Scalars['String'] | null;
  readonly weaknesses_not?: Scalars['String'] | null;
  readonly weaknesses_contains?: Scalars['String'] | null;
  readonly weaknesses_not_contains?: Scalars['String'] | null;
  readonly weaknesses_starts_with?: Scalars['String'] | null;
  readonly weaknesses_not_starts_with?: Scalars['String'] | null;
  readonly weaknesses_ends_with?: Scalars['String'] | null;
  readonly weaknesses_not_ends_with?: Scalars['String'] | null;
  readonly weaknesses_i?: Scalars['String'] | null;
  readonly weaknesses_not_i?: Scalars['String'] | null;
  readonly weaknesses_contains_i?: Scalars['String'] | null;
  readonly weaknesses_not_contains_i?: Scalars['String'] | null;
  readonly weaknesses_starts_with_i?: Scalars['String'] | null;
  readonly weaknesses_not_starts_with_i?: Scalars['String'] | null;
  readonly weaknesses_ends_with_i?: Scalars['String'] | null;
  readonly weaknesses_not_ends_with_i?: Scalars['String'] | null;
  readonly weaknesses_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly weaknesses_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly photo?: PlayerImageWhereInput | null;
  readonly photo_is_null?: Scalars['Boolean'] | null;
  readonly position?: Scalars['String'] | null;
  readonly position_not?: Scalars['String'] | null;
  readonly position_contains?: Scalars['String'] | null;
  readonly position_not_contains?: Scalars['String'] | null;
  readonly position_starts_with?: Scalars['String'] | null;
  readonly position_not_starts_with?: Scalars['String'] | null;
  readonly position_ends_with?: Scalars['String'] | null;
  readonly position_not_ends_with?: Scalars['String'] | null;
  readonly position_i?: Scalars['String'] | null;
  readonly position_not_i?: Scalars['String'] | null;
  readonly position_contains_i?: Scalars['String'] | null;
  readonly position_not_contains_i?: Scalars['String'] | null;
  readonly position_starts_with_i?: Scalars['String'] | null;
  readonly position_not_starts_with_i?: Scalars['String'] | null;
  readonly position_ends_with_i?: Scalars['String'] | null;
  readonly position_not_ends_with_i?: Scalars['String'] | null;
  readonly position_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly position_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly team?: TeamWhereInput | null;
  readonly team_is_null?: Scalars['Boolean'] | null;
};

export type PlayerWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortPlayersBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'number_ASC'
  | 'number_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'strengths_ASC'
  | 'strengths_DESC'
  | 'weaknesses_ASC'
  | 'weaknesses_DESC'
  | 'photo_ASC'
  | 'photo_DESC'
  | 'position_ASC'
  | 'position_DESC'
  | 'team_ASC'
  | 'team_DESC';

export type PlayerUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly number?: Scalars['String'] | null;
  readonly description?: Scalars['String'] | null;
  readonly strengths?: Scalars['String'] | null;
  readonly weaknesses?: Scalars['String'] | null;
  readonly photo?: PlayerImageRelateToOneInput | null;
  readonly position?: Scalars['String'] | null;
  readonly team?: TeamRelateToOneInput | null;
};

export type PlayersUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: PlayerUpdateInput | null;
};

export type PlayerCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly number?: Scalars['String'] | null;
  readonly description?: Scalars['String'] | null;
  readonly strengths?: Scalars['String'] | null;
  readonly weaknesses?: Scalars['String'] | null;
  readonly photo?: PlayerImageRelateToOneInput | null;
  readonly position?: Scalars['String'] | null;
  readonly team?: TeamRelateToOneInput | null;
};

export type PlayersCreateInput = {
  readonly data?: PlayerCreateInput | null;
};

export type PlayerRelateToOneInput = {
  readonly create?: PlayerCreateInput | null;
  readonly connect?: PlayerWhereUniqueInput | null;
  readonly disconnect?: PlayerWhereUniqueInput | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type PlayerImageWhereInput = {
  readonly AND?: ReadonlyArray<PlayerImageWhereInput | null> | null;
  readonly OR?: ReadonlyArray<PlayerImageWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly image?: Scalars['String'] | null;
  readonly image_not?: Scalars['String'] | null;
  readonly image_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly image_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly altText?: Scalars['String'] | null;
  readonly altText_not?: Scalars['String'] | null;
  readonly altText_contains?: Scalars['String'] | null;
  readonly altText_not_contains?: Scalars['String'] | null;
  readonly altText_starts_with?: Scalars['String'] | null;
  readonly altText_not_starts_with?: Scalars['String'] | null;
  readonly altText_ends_with?: Scalars['String'] | null;
  readonly altText_not_ends_with?: Scalars['String'] | null;
  readonly altText_i?: Scalars['String'] | null;
  readonly altText_not_i?: Scalars['String'] | null;
  readonly altText_contains_i?: Scalars['String'] | null;
  readonly altText_not_contains_i?: Scalars['String'] | null;
  readonly altText_starts_with_i?: Scalars['String'] | null;
  readonly altText_not_starts_with_i?: Scalars['String'] | null;
  readonly altText_ends_with_i?: Scalars['String'] | null;
  readonly altText_not_ends_with_i?: Scalars['String'] | null;
  readonly altText_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly altText_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly player?: PlayerWhereInput | null;
  readonly player_is_null?: Scalars['Boolean'] | null;
};

export type PlayerImageWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortPlayerImagesBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'altText_ASC'
  | 'altText_DESC'
  | 'player_ASC'
  | 'player_DESC';

export type PlayerImageUpdateInput = {
  readonly image?: any | null;
  readonly altText?: Scalars['String'] | null;
  readonly player?: PlayerRelateToOneInput | null;
};

export type PlayerImagesUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: PlayerImageUpdateInput | null;
};

export type PlayerImageCreateInput = {
  readonly image?: any | null;
  readonly altText?: Scalars['String'] | null;
  readonly player?: PlayerRelateToOneInput | null;
};

export type PlayerImagesCreateInput = {
  readonly data?: PlayerImageCreateInput | null;
};

export type TrainingItemWhereInput = {
  readonly AND?: ReadonlyArray<TrainingItemWhereInput | null> | null;
  readonly OR?: ReadonlyArray<TrainingItemWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly quantity?: Scalars['Int'] | null;
  readonly quantity_not?: Scalars['Int'] | null;
  readonly quantity_lt?: Scalars['Int'] | null;
  readonly quantity_lte?: Scalars['Int'] | null;
  readonly quantity_gt?: Scalars['Int'] | null;
  readonly quantity_gte?: Scalars['Int'] | null;
  readonly quantity_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly quantity_not_in?: ReadonlyArray<Scalars['Int'] | null> | null;
  readonly exercise?: ExerciseWhereInput | null;
  readonly exercise_is_null?: Scalars['Boolean'] | null;
  readonly user?: UserWhereInput | null;
  readonly user_is_null?: Scalars['Boolean'] | null;
};

export type TrainingItemWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortTrainingItemsBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'quantity_ASC'
  | 'quantity_DESC'
  | 'exercise_ASC'
  | 'exercise_DESC'
  | 'user_ASC'
  | 'user_DESC';

export type TrainingItemUpdateInput = {
  readonly quantity?: Scalars['Int'] | null;
  readonly exercise?: ExerciseRelateToOneInput | null;
  readonly user?: UserRelateToOneInput | null;
};

export type TrainingItemsUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: TrainingItemUpdateInput | null;
};

export type TrainingItemCreateInput = {
  readonly quantity?: Scalars['Int'] | null;
  readonly exercise?: ExerciseRelateToOneInput | null;
  readonly user?: UserRelateToOneInput | null;
};

export type TrainingItemsCreateInput = {
  readonly data?: TrainingItemCreateInput | null;
};

export type PlayerRelateToManyInput = {
  readonly create?: ReadonlyArray<PlayerCreateInput | null> | null;
  readonly connect?: ReadonlyArray<PlayerWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<PlayerWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type TeamWhereInput = {
  readonly AND?: ReadonlyArray<TeamWhereInput | null> | null;
  readonly OR?: ReadonlyArray<TeamWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly user?: UserWhereInput | null;
  readonly user_is_null?: Scalars['Boolean'] | null;
  readonly players_every?: PlayerWhereInput | null;
  readonly players_some?: PlayerWhereInput | null;
  readonly players_none?: PlayerWhereInput | null;
};

export type TeamWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortTeamsBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'user_ASC'
  | 'user_DESC'
  | 'players_ASC'
  | 'players_DESC';

export type TeamUpdateInput = {
  readonly user?: UserRelateToOneInput | null;
  readonly players?: PlayerRelateToManyInput | null;
};

export type TeamsUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: TeamUpdateInput | null;
};

export type TeamCreateInput = {
  readonly user?: UserRelateToOneInput | null;
  readonly players?: PlayerRelateToManyInput | null;
};

export type TeamsCreateInput = {
  readonly data?: TeamCreateInput | null;
};

export type EventsListItemWhereInput = {
  readonly AND?: ReadonlyArray<EventsListItemWhereInput | null> | null;
  readonly OR?: ReadonlyArray<EventsListItemWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly title?: Scalars['String'] | null;
  readonly title_not?: Scalars['String'] | null;
  readonly title_contains?: Scalars['String'] | null;
  readonly title_not_contains?: Scalars['String'] | null;
  readonly title_starts_with?: Scalars['String'] | null;
  readonly title_not_starts_with?: Scalars['String'] | null;
  readonly title_ends_with?: Scalars['String'] | null;
  readonly title_not_ends_with?: Scalars['String'] | null;
  readonly title_i?: Scalars['String'] | null;
  readonly title_not_i?: Scalars['String'] | null;
  readonly title_contains_i?: Scalars['String'] | null;
  readonly title_not_contains_i?: Scalars['String'] | null;
  readonly title_starts_with_i?: Scalars['String'] | null;
  readonly title_not_starts_with_i?: Scalars['String'] | null;
  readonly title_ends_with_i?: Scalars['String'] | null;
  readonly title_not_ends_with_i?: Scalars['String'] | null;
  readonly title_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly title_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly user?: UserWhereInput | null;
  readonly user_is_null?: Scalars['Boolean'] | null;
  readonly startdate?: Scalars['String'] | null;
  readonly startdate_not?: Scalars['String'] | null;
  readonly startdate_lt?: Scalars['String'] | null;
  readonly startdate_lte?: Scalars['String'] | null;
  readonly startdate_gt?: Scalars['String'] | null;
  readonly startdate_gte?: Scalars['String'] | null;
  readonly startdate_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly startdate_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly enddate?: Scalars['String'] | null;
  readonly enddate_not?: Scalars['String'] | null;
  readonly enddate_lt?: Scalars['String'] | null;
  readonly enddate_lte?: Scalars['String'] | null;
  readonly enddate_gt?: Scalars['String'] | null;
  readonly enddate_gte?: Scalars['String'] | null;
  readonly enddate_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly enddate_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
};

export type EventsListItemWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortEventsListItemsBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'user_ASC'
  | 'user_DESC'
  | 'startdate_ASC'
  | 'startdate_DESC'
  | 'enddate_ASC'
  | 'enddate_DESC';

export type EventsListItemUpdateInput = {
  readonly title?: Scalars['String'] | null;
  readonly user?: UserRelateToOneInput | null;
  readonly startdate?: Scalars['String'] | null;
  readonly enddate?: Scalars['String'] | null;
};

export type EventsListItemsUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: EventsListItemUpdateInput | null;
};

export type EventsListItemCreateInput = {
  readonly title?: Scalars['String'] | null;
  readonly user?: UserRelateToOneInput | null;
  readonly startdate?: Scalars['String'] | null;
  readonly enddate?: Scalars['String'] | null;
};

export type EventsListItemsCreateInput = {
  readonly data?: EventsListItemCreateInput | null;
};

export type UserRelateToManyInput = {
  readonly create?: ReadonlyArray<UserCreateInput | null> | null;
  readonly connect?: ReadonlyArray<UserWhereUniqueInput | null> | null;
  readonly disconnect?: ReadonlyArray<UserWhereUniqueInput | null> | null;
  readonly disconnectAll?: Scalars['Boolean'] | null;
};

export type RoleWhereInput = {
  readonly AND?: ReadonlyArray<RoleWhereInput | null> | null;
  readonly OR?: ReadonlyArray<RoleWhereInput | null> | null;
  readonly id?: Scalars['ID'] | null;
  readonly id_not?: Scalars['ID'] | null;
  readonly id_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly id_not_in?: ReadonlyArray<Scalars['ID'] | null> | null;
  readonly name?: Scalars['String'] | null;
  readonly name_not?: Scalars['String'] | null;
  readonly name_contains?: Scalars['String'] | null;
  readonly name_not_contains?: Scalars['String'] | null;
  readonly name_starts_with?: Scalars['String'] | null;
  readonly name_not_starts_with?: Scalars['String'] | null;
  readonly name_ends_with?: Scalars['String'] | null;
  readonly name_not_ends_with?: Scalars['String'] | null;
  readonly name_i?: Scalars['String'] | null;
  readonly name_not_i?: Scalars['String'] | null;
  readonly name_contains_i?: Scalars['String'] | null;
  readonly name_not_contains_i?: Scalars['String'] | null;
  readonly name_starts_with_i?: Scalars['String'] | null;
  readonly name_not_starts_with_i?: Scalars['String'] | null;
  readonly name_ends_with_i?: Scalars['String'] | null;
  readonly name_not_ends_with_i?: Scalars['String'] | null;
  readonly name_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly name_not_in?: ReadonlyArray<Scalars['String'] | null> | null;
  readonly canManageExercises?: Scalars['Boolean'] | null;
  readonly canManageExercises_not?: Scalars['Boolean'] | null;
  readonly canSeeOtherUsers?: Scalars['Boolean'] | null;
  readonly canSeeOtherUsers_not?: Scalars['Boolean'] | null;
  readonly canManageUsers?: Scalars['Boolean'] | null;
  readonly canManageUsers_not?: Scalars['Boolean'] | null;
  readonly canManageRoles?: Scalars['Boolean'] | null;
  readonly canManageRoles_not?: Scalars['Boolean'] | null;
  readonly canManageTraining?: Scalars['Boolean'] | null;
  readonly canManageTraining_not?: Scalars['Boolean'] | null;
  readonly canManageTeam?: Scalars['Boolean'] | null;
  readonly canManageTeam_not?: Scalars['Boolean'] | null;
  readonly canManageEvents?: Scalars['Boolean'] | null;
  readonly canManageEvents_not?: Scalars['Boolean'] | null;
  readonly assignedTo_every?: UserWhereInput | null;
  readonly assignedTo_some?: UserWhereInput | null;
  readonly assignedTo_none?: UserWhereInput | null;
};

export type RoleWhereUniqueInput = {
  readonly id: Scalars['ID'];
};

export type SortRolesBy =
  | 'id_ASC'
  | 'id_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'canManageExercises_ASC'
  | 'canManageExercises_DESC'
  | 'canSeeOtherUsers_ASC'
  | 'canSeeOtherUsers_DESC'
  | 'canManageUsers_ASC'
  | 'canManageUsers_DESC'
  | 'canManageRoles_ASC'
  | 'canManageRoles_DESC'
  | 'canManageTraining_ASC'
  | 'canManageTraining_DESC'
  | 'canManageTeam_ASC'
  | 'canManageTeam_DESC'
  | 'canManageEvents_ASC'
  | 'canManageEvents_DESC'
  | 'assignedTo_ASC'
  | 'assignedTo_DESC';

export type RoleUpdateInput = {
  readonly name?: Scalars['String'] | null;
  readonly canManageExercises?: Scalars['Boolean'] | null;
  readonly canSeeOtherUsers?: Scalars['Boolean'] | null;
  readonly canManageUsers?: Scalars['Boolean'] | null;
  readonly canManageRoles?: Scalars['Boolean'] | null;
  readonly canManageTraining?: Scalars['Boolean'] | null;
  readonly canManageTeam?: Scalars['Boolean'] | null;
  readonly canManageEvents?: Scalars['Boolean'] | null;
  readonly assignedTo?: UserRelateToManyInput | null;
};

export type RolesUpdateInput = {
  readonly id: Scalars['ID'];
  readonly data?: RoleUpdateInput | null;
};

export type RoleCreateInput = {
  readonly name?: Scalars['String'] | null;
  readonly canManageExercises?: Scalars['Boolean'] | null;
  readonly canSeeOtherUsers?: Scalars['Boolean'] | null;
  readonly canManageUsers?: Scalars['Boolean'] | null;
  readonly canManageRoles?: Scalars['Boolean'] | null;
  readonly canManageTraining?: Scalars['Boolean'] | null;
  readonly canManageTeam?: Scalars['Boolean'] | null;
  readonly canManageEvents?: Scalars['Boolean'] | null;
  readonly assignedTo?: UserRelateToManyInput | null;
};

export type RolesCreateInput = {
  readonly data?: RoleCreateInput | null;
};

export type _ksListsMetaInput = {
  readonly key?: Scalars['String'] | null;
  readonly auxiliary?: Scalars['Boolean'] | null;
};

export type _ListSchemaFieldsInput = {
  readonly type?: Scalars['String'] | null;
};

export type PasswordAuthErrorCode =
  | 'FAILURE'
  | 'IDENTITY_NOT_FOUND'
  | 'SECRET_NOT_SET'
  | 'MULTIPLE_IDENTITY_MATCHES'
  | 'SECRET_MISMATCH';

export type CreateInitialUserInput = {
  readonly name?: Scalars['String'] | null;
  readonly email?: Scalars['String'] | null;
  readonly password?: Scalars['String'] | null;
};

export type PasswordResetRequestErrorCode =
  | 'IDENTITY_NOT_FOUND'
  | 'MULTIPLE_IDENTITY_MATCHES';

export type PasswordResetRedemptionErrorCode =
  | 'FAILURE'
  | 'IDENTITY_NOT_FOUND'
  | 'MULTIPLE_IDENTITY_MATCHES'
  | 'TOKEN_NOT_SET'
  | 'TOKEN_MISMATCH'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_REDEEMED';

export type KeystoneAdminUIFieldMetaCreateViewFieldMode = 'edit' | 'hidden';

export type KeystoneAdminUIFieldMetaListViewFieldMode = 'read' | 'hidden';

export type KeystoneAdminUIFieldMetaItemViewFieldMode =
  | 'edit'
  | 'read'
  | 'hidden';

export type KeystoneAdminUISortDirection = 'ASC' | 'DESC';

export type UserListTypeInfo = {
  key: 'User';
  fields:
    | 'id'
    | 'name'
    | 'email'
    | 'password'
    | 'training'
    | 'team'
    | 'event'
    | 'role'
    | 'exercise'
    | 'passwordResetToken'
    | 'passwordResetIssuedAt'
    | 'passwordResetRedeemedAt'
    | 'magicAuthToken'
    | 'magicAuthIssuedAt'
    | 'magicAuthRedeemedAt';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly email?: string | null;
    readonly password?: string | null;
    readonly training?: string | null;
    readonly team?: string | null;
    readonly event?: string | null;
    readonly role?: string | null;
    readonly exercise?: string | null;
    readonly passwordResetToken?: string | null;
    readonly passwordResetIssuedAt?: Date | null;
    readonly passwordResetRedeemedAt?: Date | null;
    readonly magicAuthToken?: string | null;
    readonly magicAuthIssuedAt?: Date | null;
    readonly magicAuthRedeemedAt?: Date | null;
  };
  inputs: {
    where: UserWhereInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: UserWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortUsersBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type UserListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    UserListTypeInfo,
    UserListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  UserListTypeInfo,
  UserListTypeInfo['fields']
>;

export type ExerciseListTypeInfo = {
  key: 'Exercise';
  fields: 'id' | 'name' | 'description' | 'photo' | 'position' | 'user';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly description?: string | null;
    readonly photo?: string | null;
    readonly position?: string | null;
    readonly user?: string | null;
  };
  inputs: {
    where: ExerciseWhereInput;
    create: ExerciseCreateInput;
    update: ExerciseUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: ExerciseWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortExercisesBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type ExerciseListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    ExerciseListTypeInfo,
    ExerciseListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  ExerciseListTypeInfo,
  ExerciseListTypeInfo['fields']
>;

export type ExerciseImageListTypeInfo = {
  key: 'ExerciseImage';
  fields: 'id' | 'image' | 'altText' | 'exercise';
  backing: {
    readonly id: string;
    readonly image?: any;
    readonly altText?: string | null;
    readonly exercise?: string | null;
  };
  inputs: {
    where: ExerciseImageWhereInput;
    create: ExerciseImageCreateInput;
    update: ExerciseImageUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: ExerciseImageWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortExerciseImagesBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type ExerciseImageListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    ExerciseImageListTypeInfo,
    ExerciseImageListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  ExerciseImageListTypeInfo,
  ExerciseImageListTypeInfo['fields']
>;

export type PlayerListTypeInfo = {
  key: 'Player';
  fields:
    | 'id'
    | 'name'
    | 'number'
    | 'description'
    | 'strengths'
    | 'weaknesses'
    | 'photo'
    | 'position'
    | 'team';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly number?: string | null;
    readonly description?: string | null;
    readonly strengths?: string | null;
    readonly weaknesses?: string | null;
    readonly photo?: string | null;
    readonly position?: string | null;
    readonly team?: string | null;
  };
  inputs: {
    where: PlayerWhereInput;
    create: PlayerCreateInput;
    update: PlayerUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: PlayerWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortPlayersBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type PlayerListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    PlayerListTypeInfo,
    PlayerListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  PlayerListTypeInfo,
  PlayerListTypeInfo['fields']
>;

export type PlayerImageListTypeInfo = {
  key: 'PlayerImage';
  fields: 'id' | 'image' | 'altText' | 'player';
  backing: {
    readonly id: string;
    readonly image?: any;
    readonly altText?: string | null;
    readonly player?: string | null;
  };
  inputs: {
    where: PlayerImageWhereInput;
    create: PlayerImageCreateInput;
    update: PlayerImageUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: PlayerImageWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortPlayerImagesBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type PlayerImageListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    PlayerImageListTypeInfo,
    PlayerImageListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  PlayerImageListTypeInfo,
  PlayerImageListTypeInfo['fields']
>;

export type TrainingItemListTypeInfo = {
  key: 'TrainingItem';
  fields: 'id' | 'quantity' | 'exercise' | 'user';
  backing: {
    readonly id: string;
    readonly quantity?: number | null;
    readonly exercise?: string | null;
    readonly user?: string | null;
  };
  inputs: {
    where: TrainingItemWhereInput;
    create: TrainingItemCreateInput;
    update: TrainingItemUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: TrainingItemWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortTrainingItemsBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type TrainingItemListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    TrainingItemListTypeInfo,
    TrainingItemListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  TrainingItemListTypeInfo,
  TrainingItemListTypeInfo['fields']
>;

export type TeamListTypeInfo = {
  key: 'Team';
  fields: 'id' | 'user' | 'players';
  backing: {
    readonly id: string;
    readonly user?: string | null;
    readonly players?: string | null;
  };
  inputs: {
    where: TeamWhereInput;
    create: TeamCreateInput;
    update: TeamUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: TeamWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortTeamsBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type TeamListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    TeamListTypeInfo,
    TeamListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  TeamListTypeInfo,
  TeamListTypeInfo['fields']
>;

export type EventsListItemListTypeInfo = {
  key: 'EventsListItem';
  fields: 'id' | 'title' | 'user' | 'startdate' | 'enddate';
  backing: {
    readonly id: string;
    readonly title?: string | null;
    readonly user?: string | null;
    readonly startdate?: Date | null;
    readonly enddate?: Date | null;
  };
  inputs: {
    where: EventsListItemWhereInput;
    create: EventsListItemCreateInput;
    update: EventsListItemUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: EventsListItemWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortEventsListItemsBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type EventsListItemListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    EventsListItemListTypeInfo,
    EventsListItemListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  EventsListItemListTypeInfo,
  EventsListItemListTypeInfo['fields']
>;

export type RoleListTypeInfo = {
  key: 'Role';
  fields:
    | 'id'
    | 'name'
    | 'canManageExercises'
    | 'canSeeOtherUsers'
    | 'canManageUsers'
    | 'canManageRoles'
    | 'canManageTraining'
    | 'canManageTeam'
    | 'canManageEvents'
    | 'assignedTo';
  backing: {
    readonly id: string;
    readonly name?: string | null;
    readonly canManageExercises?: boolean | null;
    readonly canSeeOtherUsers?: boolean | null;
    readonly canManageUsers?: boolean | null;
    readonly canManageRoles?: boolean | null;
    readonly canManageTraining?: boolean | null;
    readonly canManageTeam?: boolean | null;
    readonly canManageEvents?: boolean | null;
    readonly assignedTo?: string | null;
  };
  inputs: {
    where: RoleWhereInput;
    create: RoleCreateInput;
    update: RoleUpdateInput;
  };
  args: {
    listQuery: {
      readonly where?: RoleWhereInput | null;
      readonly sortBy?: ReadonlyArray<SortRolesBy> | null;
      readonly first?: Scalars['Int'] | null;
      readonly skip?: Scalars['Int'] | null;
    };
  };
};

export type RoleListFn = (
  listConfig: import('@keystone-next/keystone/schema').ListConfig<
    RoleListTypeInfo,
    RoleListTypeInfo['fields']
  >
) => import('@keystone-next/keystone/schema').ListConfig<
  RoleListTypeInfo,
  RoleListTypeInfo['fields']
>;

export type KeystoneListsTypeInfo = {
  readonly User: UserListTypeInfo;
  readonly Exercise: ExerciseListTypeInfo;
  readonly ExerciseImage: ExerciseImageListTypeInfo;
  readonly Player: PlayerListTypeInfo;
  readonly PlayerImage: PlayerImageListTypeInfo;
  readonly TrainingItem: TrainingItemListTypeInfo;
  readonly Team: TeamListTypeInfo;
  readonly EventsListItem: EventsListItemListTypeInfo;
  readonly Role: RoleListTypeInfo;
};
