Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    data: {
        companyName: '',
        lineOfBusinessName: '',
        pilotTeamName: '',
        selectedParentProject: ''
    },
    models: null,
    projectCounter: 0,
    projectCountTotal: 0,
    
    artifactCounter: 0,
    artifactCountTotal: 0,
    
    projectTree: {
        name: 'RallyTrial',
        children: [
            {
                name: 'Company',
                children: [
                    {
                        name: 'Line of Business',
                        children: [
                            {
                                name: 'Pilot Team',
                                children: [
                                    {
                                        name: 'Company Team'
                                    },
                                    {
                                        name: 'Rally Team'
                                    }]
                            }]
                    }]
            }
        ]
    },

    artifactTree2: {
        type: 'PortfolioItem/Initiative',
        name: 'Successful Trial Pilot with (Line of Business Group)',
        children: [
            {
                type: 'PortfolioItem/Feature',
                name: 'Administrative Activities',
                children: [
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Trial agreements',
                        children: [
                            { type: 'Task', name: 'NDA' },
                            { type: 'Task', name: 'Info Security' },
                            { type: 'Task', name: 'Procurement' },
                            { type: 'Task', name: 'Rally Deployment' },
                            { type: 'Task', name: 'Identify Pilot Team' }
                        ]
                    }
                ]
            },
            {
                type: 'PortfolioItem/Feature',
                name: 'Rally Training + Working Sessions',
                children: [
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Trial roadmap',
                        children: [
                            { type: 'Task', name: 'Rally and Company review and accept POV' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Rally/customer collaboration during trial',
                        children: [
                            {
                                type: 'HierarchicalRequirement',
                                name: "Understand Customer's organizational and operational environment",
                                children: [
                                    { type: 'Task', name: 'What is your Product-Team organizational structure to be managed using Agile approaches in Rally?' },
                                    { type: 'Task', name: 'What is driving your Agile and Lean Transformation?' },
                                    { type: 'Task', name: 'What is your organization hierarchy / structure?' },
                                    { type: 'Task', name: 'How do you organize your teams and / or work -- e.g. Team / Product / Feature / Component based?' },
                                    { type: 'Task', name: 'What do you report, to whom, and why?' }
                                ]
                            },
                            {
                                type: 'HierarchicalRequirement',
                                name: "Detailed Demo/Trial Kickoff Meeting",
                                children: [
                                    {
                                        type: 'HierarchicalRequirement',
                                        name: 'Setup',
                                        children: [
                                            { type: 'Task', name: 'Rally subscription configuration and setup overview' },
                                            { type: 'Task', name: 'Rally Workspace and Project Hierarchy overview' },
                                            { type: 'Task', name: 'Rally users and permissions overview' }
                                        ]
                                    },
                                    {
                                        type: 'HierarchicalRequirement',
                                        name: 'Strategy (Business Level)',
                                        children: []
                                    },
                                    {
                                        type: 'HierarchicalRequirement',
                                        name: 'Execution (Delvery Level)',
                                        children: [
                                            { type: 'Task', name: 'Support for Scrum and Kanban' }
                                        ]
                                    },
                                    {
                                        type: 'HierarchicalRequirement',
                                        name: 'Extending Rally',
                                        children: [
                                            { type: 'Task', name: 'Apps and Dashboards' },
                                            { type: 'Task', name: 'Web Services API' }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'HierarchicalRequirement',
                                name: "Self help resources",
                                children: [
                                    {
                                        type: 'Task',
                                        name: 'Rally Online Help'
                                    },
                                    {
                                        type: 'Task',
                                        name: 'Rally Video Tutorials'
                                    },
                                    {
                                        type: 'Task',
                                        name: 'Rally Support'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                type: 'PortfolioItem/Feature',
                name: 'The TRIAL',
                children: [
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Configure organizational structure (Project Hierarchy)',
                        children: [
                            { type: 'Task', name: 'Create project structure in Rally' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Populate Team Backlog(s)',
                        children: [
                            { type: 'Task', name: '[RPM] create portfolio items' },
                            { type: 'Task', name: 'create stories' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Scrum',
                        children: [
                            { type: 'Task', name: 'Define Release and Iteration time-boxes' },
                            { type: 'Task', name: 'Plan Stories (Backlog) into Iterations' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Kanban',
                        children: [
                            { type: 'Task', name: 'Define Kanban States' },
                            { type: 'Task', name: '[RPM] Define PI level value stream' },
                            { type: 'Task', name: 'Add/configure team Kanban board(s)' },
                            { type: 'Task', name: '[RPM] Add/configure Portfolio Kanban board(s)' }
                        ]
                    },
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Tracking',
                        children: [
                            { type: 'Task', name: 'Setup Pages (Dashboards)' },
                            { type: 'Task', name: 'Setup Apps' }
                        ]
                    }
                ]
            }
            
        ]
    },
    artifactTree: {
        type: 'PortfolioItem/Initiative',
        name: 'Successful Trial Pilot with (Line of Business Group)',
        children: [
            {
                type: 'PortfolioItem/Feature',
                name: 'Rally Training + Working Sessions',
                children: [
                    {
                        type: 'HierarchicalRequirement',
                        name: 'Rally/customer collaboration during trial',
                        children: [
                            {
                                type: 'HierarchicalRequirement',
                                name: "Understand Customer's organizational and operational environment",
                                children: [
                                    { type: 'Task', name: 'What is your Product-Team organizational structure to be managed using Agile approaches in Rally?' },
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    launch: function() {

        this._buildWizard();
    },

    /* PRIVATE */    
    _buildWizard: function() {
        var me = this;    

        var cardStart = Ext.create('Ext.Component', {
            itemId: 'card-start',
            html: "<div class='headline'>Welcome to your Rally Trial.</div><div class='content'>Organizations use Rally to accelerate the pace of innovation, improve productivity, and more effectively adapt to rapidly changing customer needs and competitive dynamics.</div><div class='content'>Get on the fast track to evaluating Rally.<br/>Click 'Start' to begin!</div>"
        });
        
        
        var cardOverview = Ext.create('Ext.Component', {
            itemId: 'card-overview',
            html: "<div class='headline'>Lets Get Started.</div><div class='content'>Agile teams increase their effectiveness by making work visible.</div><div class='content'>Lets make your trial experience impactful by using the Rally Product to guide you through the process.</div><div class='content'>We'll start by creating some Initiatives and User Stories to define our work.</div>" 
        });
        
        
        var cardPickProject = Ext.create('Ext.Container', {
            itemId: 'card-pick-project',
            items: [
                {
                    html: "<div class='headline'>Setup our Organization.</div><div class='content'>We will begin by creating a structure to model your Organization and Team that is evaluating Rally.</div><div class='content'>Pick a project from the list.  We will simply be creating our Evaluation Projects underneath it.</div>",
                    margin: '0 0 15 0',
                    border: 0
                },
                {
                    xtype: 'rallyprojectpicker',
                    fieldLabel: 'Project',
                    labelAlign: 'right',
                    width: 300,
                    labelWidth: 100,
                    labelCls: 'field-label',
                    showMostRecentlyUsedProjects: false,
                    showProjectScopeUpAndDown: false,
                    workspace: this.getContext().getWorkspaceRef(),
                    listeners: {
                        change: function(picker) {
                            this.data.selectedParentProject = picker.getValue();
                            var nextButton = Ext.getCmp('nav-button-next');
                            nextButton.setDisabled(false);
                        },
                        scope: this
                    }
                }
            ]
        });
        
        var cardNames = Ext.create('Ext.Container', {
            itemId: 'card-names',
            items: [
                {
                    html: "<div class='headline'>Customized Names.</div><div class='content'>To make your experience feel at home, we'd like to use relevant names in the tool setup.</div><div class='content'>Please provide an example Line of Business and pilot Team Name.</div>",
                    border: 0,
                    margin: '0 0 10 0'
                },
                {
                    xtype: 'rallytextfield',
                    itemId: 'companyName',
                    fieldLabel: 'Company Name',
                    labelAlign: 'right',
                    width: 350,
                    labelWidth: 100,
                    labelCls: 'field-label',
                    emptyText: 'Acme Inc., Widgets Unlimited, etc',
                    listeners: {
                        change: function(textfield, newValue, oldValue) {
                            this.data.companyName = newValue;
                            var nextButton = Ext.getCmp('nav-button-next');
                            var pilotTeamName = this.down('#pilotTeamName').getValue();
                            var lineOfBusinessName = this.down('#lineOfBusinessName').getValue();
                            if (newValue.length > 0 && pilotTeamName.length > 0 && lineOfBusinessName > 0) {
                                nextButton.setDisabled(false);
                            } else {
                                nextButton.setDisabled(true);
                            }
                        },
                        focus: function(textfield) {
                                textfield.setValue('');
                        },
                        scope: this
                    }
                },
                {
                    xtype: 'rallytextfield',
                    itemId: 'lineOfBusinessName',
                    fieldLabel: 'Line of Business',
                    labelAlign: 'right',
                    width: 350,
                    labelWidth: 100,
                    labelCls: 'field-label',
                    emptyText: 'Consumer Products, Home Mortgages, etc',
                    listeners: {
                        change: function(textfield, newValue, oldValue) {
                            this.data.lineOfBusinessName = newValue;
                            var nextButton = Ext.getCmp('nav-button-next');
                            var companyName = this.down('#companyName').getValue();
                            var pilotTeamName = this.down('#pilotTeamName').getValue();
                            
                            if (newValue.length > 0 && companyName.length > 0 && pilotTeamName.length > 0) {
                                nextButton.setDisabled(false);
                            } else {
                                nextButton.setDisabled(true);
                            }
                        },
                        focus: function(textfield) {
                                textfield.setValue('');
                        },
                        scope: this
                    }
                },
                {
                    xtype: 'rallytextfield',
                    itemId: 'pilotTeamName',
                    fieldLabel: 'Pilot Project',
                    labelAlign: 'right',
                    width: 350,
                    labelWidth: 100,
                    labelCls: 'field-label',
                    emptyText: 'Scrum Team #1, Red Team, Flying Aces, etc',
                    listeners: {
                        change: function(textfield, newValue, oldValue) {
                            this.data.pilotTeamName = newValue;
                            var nextButton = Ext.getCmp('nav-button-next');
                            var companyName = this.down('#companyName').getValue();
                            var lineOfBusinessName = this.down('#lineOfBusinessName').getValue();
                            if (newValue.length > 0 && companyName.length > 0 && lineOfBusinessName.length > 0) {
                                nextButton.setDisabled(false);
                            } else {
                                nextButton.setDisabled(true);
                            }
                        },
                        scope: this
                    }
                }
            ]
        });
        
        var cardConfirmation = Ext.create('Ext.Component', {
            itemId: 'card-confirmation',
            data: null,
            tpl: new Ext.XTemplate(
                "<div class='headline'>Confirmation.</div>",
                "<div class='content'>We're prepared to setup your Trial.  Feel free to go back and make any changes.</div>",
                "<div class='content'>&nbsp;&nbsp;&nbsp;&nbsp;<b>Project:</b> {selectedParentProject}</div>",
                "<div class='content'>&nbsp;&nbsp;&nbsp;&nbsp;<b>Line of Business:</b> {lineOfBusinessName}</div>",
                "<div class='content'>&nbsp;&nbsp;&nbsp;&nbsp;<b>Pilot Project:</b> {pilotTeamName}</div>",
                "<div class='content'>Click 'Setup Trial' to begin your Trial!</div>"
                )
        });
        
        var cardStatus = Ext.create('Ext.Component', {
            itemId: 'card-status',
            html: ''   // we have a loadmask
        });
    
        var cardFinish = Ext.create('Ext.Component', {
            itemId: 'card-final',
            html: "<div class='headline'>Trial by Rally.</div><div class='content'>Managing your trial just got easier.<div><div class='content'>You now have a way to track your trial and ensure you Rally experience matches your needs.</div><div class='content'><b>Next Step:</b>Collaboration is key.  Your Rally account team will work with you to tailor dashboard views to monitor progress.  Contact them today!</div>"
        });
        
        var wizard = Ext.create('Ext.panel.Panel', {
            itemId: 'wizard',
            title: 'Trial By Rally',
            width: 400,
            height: 350,
            layout: 'card',
            bodyStyle: 'padding: 15px',
            defaults: {
                border: false
            },
            bbar: [
                {
                    id: 'nav-button-back',
                    text: 'Back',
                    handler: function(btn) {
                        this._navigate(btn.up('panel'), 'prev');
                    },
                    scope: me,
                    hidden: true
                },
                '->',
                {
                    id: 'nav-button-next',
                    text: 'Start',
                    handler: function(btn) {
                        this._navigate(btn.up('panel'), 'next');
                    },
                    scope: me,
                    disabled: false
                }
            ],
            items: [
                cardStart, cardOverview, cardPickProject, cardNames, cardConfirmation, cardStatus, cardFinish
            ]
        });
        this.add(wizard);
    },

    _navigate: function(panel, direction) {
        var me = this;
        
        var layout = panel.getLayout();
        layout[direction]();    // change to next card (prev or next)
        
        var backButton = Ext.getCmp('nav-button-back');
        var nextButton = Ext.getCmp('nav-button-next');
    
        var cardId = layout.getActiveItem().getItemId();
        
        if (cardId === 'card-start') {
            nextButton.setText('Start');
            backButton.hide();
        } else {
            nextButton.setText('Next');
        }    
                    // require project selection
        if (cardId === 'card-overview') {
            backButton.show();
        }
        // require project selection
        if (cardId === 'card-pick-project' && me.data.selectedParentProject.length === 0) {
            nextButton.setDisabled(true);
        } else {
            nextButton.setDisabled(false);
        }
        
        // require business and project names
        if (cardId === 'card-names' && (me.data.lineOfBusinessName.length === 0 || me.data.pilotTeamName.length === 0 )) {
            nextButton.setDisabled(true);
        } else {
            nextButton.setDisabled(false);
        }
        
        // populate confirmation card with given data    
        if (cardId === 'card-confirmation') {
            me.down('#card-confirmation').update(me.data);
            nextButton.setText('Setup Trial');
        }
        if (cardId === 'card-status') {
            backButton.hide();
            nextButton.hide();
            me.loadMask = new Ext.LoadMask(layout.getActiveItem(), {msg: "Creating Trial..."});    
            me.loadMask.show();

            me._createTrial();
        }
        
    },
    
    _countTreeChildren:function(tree, countRef) {
        if (tree.name) {
            countRef.counter++;
            if (tree.children)  {
                Ext.Array.each(tree.children, function(child) {
                    this._countTreeChildren(child, countRef);
                    }, this);
            }
        }
    },


    _createProjects: function() {
        var me = this;
        me.projectTree.children[0].name = me.data.companyName;
        me.projectTree.children[0].children[0].name = me.data.lineOfBusinessName;
        me.projectTree.children[0].children[0].children[0].children[0].name = me.data.pilotTeamName;
        me._createProjectTree(me.getContext().getWorkspaceRef(), me.data.selectedParentProject, me.projectTree.name, me.projectTree.children);
    },    
    
    _createProjectTree: function(workspaceRef, parentProjectRef, projectName, children) {
        var me = this;
        console.log('creating project', workspaceRef, parentProjectRef, projectName, children);
        var record = Ext.create(this.models['Project'], {
            Name: projectName,
            State: 'Open',
            Parent: parentProjectRef,
            Workspace: workspaceRef
        });
        record.save({
           callback: function(result, operation) {
               //TODO handle fail?
               me.projectCounter++;
               var currParentProjectId = result.get('ObjectID');
               Ext.Array.each(children, function(child) {
                   me._createProjectTree(workspaceRef, currParentProjectId, child.name, child.children);
               });
               me._onProjectCreated();
           } 
        });
    },

    _createArtifacts: function() {
        var me = this;
        me._createArtifactTree(me.getContext().getWorkspaceRef(), '/project/699319', null, me.artifactTree.type, me.artifactTree.name, me.artifactTree.children);
    },
    
    _createArtifactTree: function(workspaceRef, projectRef, parentRef, artifactType, artifactName, artifactChildren) {
        var me = this;
        console.log('creating artifact', workspaceRef, projectRef, parentRef, artifactType, artifactName, artifactChildren);
        
        var record = null;
        // need separate record defs since PI/US/TA each have different attributes to refer to their 'parent'
        if (artifactType.match(/Portfolio/)) {
            record = Ext.create(this.models[artifactType], {
                Workspace: workspaceRef,
                Parent: parentRef,
                Project: projectRef,
                Name: artifactName
            });
        // Stories with Feature as Parent
        } else if (artifactType === 'HierarchicalRequirement' && parentRef.match(/portfolio/)) {
            record = Ext.create(this.models[artifactType], {
                Workspace: workspaceRef,
                PortfolioItem: parentRef,
                Project: projectRef,
                Name: artifactName
            });
        // Stories with Story as Parent
        } else if (artifactType === 'HierarchicalRequirement' && parentRef.match(/hierarchical/)) {
            record = Ext.create(this.models[artifactType], {
                Workspace: workspaceRef,
                Parent: parentRef,
                Project: projectRef,
                Name: artifactName
            });
        // Task with Story as Parent
        } else if (artifactType === 'Task') {
            record = Ext.create(this.models[artifactType], {
                Workspace: workspaceRef,
                WorkProduct: parentRef,
                Project: projectRef,
                Name: artifactName
            });
        } else {
            console.error("Unexpected artifact type during artifact creation", artifactType);
        }
        record.save({
           callback: function(result, operation) {
               //TODO handle fail?
               me.artifactCounter++;
               console.log("created", result);
               var currParentRef = result.get('_ref');
               Ext.Array.each(artifactChildren, function(child) {
                   me._createArtifactTree(workspaceRef, projectRef, currParentRef, child.type, child.name, child.children);
               });
               me._onArtifactCreated();
           } 
        });
    },
    
    _onArtifactCreated: function() {
        var me = this;
        if (this.artifactCounter === this.artifactCountTotal) {
            console.log("All Artifacts Created!");
            me.loadMask.hide();
            console.log('panel', this.down('panel'));
            this._navigate(this.down('panel'), 'next');
        }
    },
    
    _onProjectCreated: function() {
        if (this.projectCounter === this.projectCountTotal) {
            console.log("All Projects Created!");
            this._createArtifacts();
        }
    },
    
    _loadModels: function() {
        Rally.data.ModelFactory.getModels({
            types: ['Project', 'PortfolioItem/Feature', 'PortfolioItem/Initiative', 'HierarchicalRequirement', 'Task'],
            context: this.getContext().getDataContext(),
            scope: this,
            success: function(models) {
                this.models = models;
                this._createProjects();
            }
        });
    },
    
    _createTrial: function() {
        var me = this;
    
        var counterRef = {counter: 0};
        me._countTreeChildren(me.projectTree, counterRef);
        me.projectCountTotal = counterRef.counter;
        console.log("Will create %i projects.", me.projectCountTotal);
        counterRef = {counter: 0};
        me._countTreeChildren(me.artifactTree, counterRef);
        me.artifactCountTotal = counterRef.counter;
        console.log("Will create %i artifacts.", me.artifactCountTotal);
        
        // create project structure
        me._loadModels();
        // create artifacts
    }
});
