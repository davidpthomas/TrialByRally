Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    data: {
        companyName: '',
        lineOfBusinessName: '',
        pilotTeamName: '',
        selectedParentProject: ''
    },
    projectModel: null,
    projectCounter: 0,
    projectCountTotal: 0,
    
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
    
    launch: function() {
        this._buildWizard();
    },
    
    _countProjects:function(tree) {
        if (tree.name) {
            this.projectCountTotal++;
            if (tree.children)  {
                Ext.Array.each(tree.children, function(child) {
                    this._countProjects(child);
                    }, this);
            }
        }
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
            html: 'Congratulations!'
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
            var loadMask = new Ext.LoadMask(layout.getActiveItem(), {msg: "Creating Trial..."});    
            loadMask.show();

            me._createTrial();
        }
        
    },

    _createTrial: function() {
        var me = this;
        
        me._countProjects(this.projectTree);
        // create project structure
        me._loadProjectModel();
        // create artifacts
    },
    _createProjects: function() {
        var me = this;
        me.projectTree.children[0].name = me.data.companyName;
        me.projectTree.children[0].children[0].name = me.data.lineOfBusinessName;
        me.projectTree.children[0].children[0].children[0].children[0].name = me.data.pilotTeamName;
        me._createProjectTree(me.getContext().getWorkspaceRef(), me.data.selectedParentProject, this.projectTree.name, this.projectTree.children);
    },    
    
    _createProjectTree: function(workspaceRef, parentProjectRef, projectName, children) {
        var me = this;
        console.log('creating project', workspaceRef, parentProjectRef, projectName, children);
        var record = Ext.create(this.projectModel, {
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

    _onProjectCreated: function() {
        if (this.projectCounter === this.projectCountTotal) {
            console.log("Projects Created!");
        }
    },
    
    _loadProjectModel: function() {
        Rally.data.ModelFactory.getModel({
            type: 'Project',
            context: this.getContext().getDataContext(),
            scope: this,
            success: function(model) {
                this.projectModel = model;
                this._createProjects();
            }
        }, this);
    }
});
